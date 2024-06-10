#! /usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */

const fs = require('fs');

// eslint-disable-next-line
const axios = require('axios');
const convert = require('xml-js');

const metadataInfo = require('../../.git/resource/metadata.json');

const githubAPIBaseURL = 'https://api.github.com/repos/sky-uk/cherry-app-launcher';
const githubAuthToken = process.env.GITHUB_AUTH_TOKEN;
const githubUserId = process.env.GITHUB_USER;

const deleteCommentsToGithub = async (issueNumber) => {
  const nodeId = process.env.GITHUB_USER_NODE_ID;

  const configGetComments = {
    method: 'get',
    url: `${githubAPIBaseURL}/issues/${issueNumber}/comments`,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubAuthToken}`,
    },
  };

  try {
    const responseComments = await axios(configGetComments);
    const filteredCommentAsPerUser = responseComments.data.find((comments) => {
      return comments.user.node_id === nodeId && comments.user.login === githubUserId;
    });

    // Delete the first comment if available
    if (filteredCommentAsPerUser) {
      const commentId = filteredCommentAsPerUser.id;
      const configDeletion = {
        method: 'delete',
        url: `${githubAPIBaseURL}/issues/comments/${commentId}`,
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${githubAuthToken}`,
        },
      };
      const responseDeletion = await axios(configDeletion);
      console.log('Delete Successful', responseDeletion);
    }
  } catch (error) {
    console.log(error);
  }
};

const addCommentToGithub = async (issueNumber, summaryData, coverageData) => {
  const data = JSON.stringify({
    body: `![Code Coverage](https://img.shields.io/badge/Code%20Coverage-${summaryData.overallCodeCoverage}%25-yellow?style=flat)\n\nPackage | Line Rate | Branch Rate\n-------- | --------- | -----------\n ${coverageData}\n**Summary** | **${summaryData.lineRate}%** (${summaryData.linesCovered} / ${summaryData.linesValid}) | **${summaryData.branchRate}%** (${summaryData.branchesCovered} / ${summaryData.branchesValid}) | ➖\n\n<!-- Sticky Pull Request Comment -->`,
  });

  const configAddComments = {
    method: 'post',
    url: `${githubAPIBaseURL}/issues/${issueNumber}/comments`,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${githubAuthToken}`,
      'Content-Type': 'application/json',
    },
    data,
  };

  try {
    const responseAddedComment = await axios(configAddComments);
    console.log(JSON.stringify(responseAddedComment.data));
  } catch (error) {
    console.log(error);
  }
};

const parseConstructSendReportToPr = async (prIssueNumber) => {
  const coverageXmlData = fs.readFileSync('../coverage/cobertura-coverage.xml');
  const parsedCoverage = convert.xml2json(coverageXmlData, { compact: false, spaces: 4 });
  const summaryAttributes = JSON.parse(parsedCoverage).elements[1].attributes;

  const summaryData = {
    lineRate: (summaryAttributes['line-rate'] * 100).toFixed(1),
    branchRate: (summaryAttributes['branch-rate'] * 100).toFixed(1),
    overallCodeCoverage: (summaryAttributes['line-rate'] * 100).toFixed(1),
    linesCovered: summaryAttributes['lines-covered'],
    linesValid: summaryAttributes['lines-valid'],
    branchesValid: summaryAttributes['branches-valid'],
    branchesCovered: summaryAttributes['branches-covered'],
  };

  const packagesDataArr = JSON.parse(parsedCoverage).elements[1].elements[1].elements;
  const refinedData = packagesDataArr.map((packageReport) => {
    const branchRate = (packageReport.attributes['branch-rate'] * 100).toFixed(1);
    const lineRate = (packageReport.attributes['line-rate'] * 100).toFixed(1);
    return `${packageReport.attributes.name} | ${lineRate}% |  ${branchRate}%`;
  });

  // Add new report as a comment to PR
  const coverageData = refinedData.join('\n ');
  await addCommentToGithub(prIssueNumber, summaryData, coverageData);
};

(async () => {
  // Delete old Report comment in PR
  const prIssueNumber = metadataInfo.find((data) => data.name === 'pr').value;
  await deleteCommentsToGithub(prIssueNumber);

  await parseConstructSendReportToPr(prIssueNumber);
})();