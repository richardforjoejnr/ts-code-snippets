/* eslint-disable no-undef */
const Template = 'Dummy';
const userName = '';

const convertToEpoch = (date) => {
  const someDate = new Date(date);
  const epoch = Math.round(someDate.getTime() / 1000);
  console.log(someDate, epoch);
  return epoch;
};

// const startDate = convertToEpoch('2022,08,18');
// const endDate = convertToEpoch('2022,08,19');

exports.RETRIEVE_TICKET = (ticketNumber) => {
  console.log(ticketNumber);
  return {
    service: 'RETRIEVE_TICKET',
    body: '',
    params: {
      db_table: 'change_request',
      query_filter: `active%3Dtrue%5Enumber%3D${ticketNumber}`,
    },
  };
};

exports.RAISE_CHANGE = (justification, startDate, endDate, template = Template) => {
  return {
    service: 'RAISE_CHANGE_TICKET',
    body: {
      created_by: userName,
      start_date: convertToEpoch(startDate),
      end_date: convertToEpoch(endDate),
      template,
      justification,
    },
  };
};

exports.UPDATE_CHANGE_UIR = (ticketNumber) => {
  return {
    service: 'UPDATE_CHANGE_TICKET',
    body: {
      updated_by: userName,
      ticket_number: ticketNumber,
      state: 'Under Implementation',
    },
  };
};

exports.UPDATE_CHANGE_PIR = (ticketNumber, implementationCode, startDate, endDate) => {
  return {
    service: 'UPDATE_CHANGE_TICKET',
    body: {
      updated_by: userName,
      ticket_number: ticketNumber,
      state: 'Post Implementation Review',
      implementation_code: implementationCode,
      implementation_detail: 'Symlinked to /app',
      start_date: convertToEpoch(startDate),
      end_date: convertToEpoch(endDate),
    },
  };
};

// implementation_code - Successful | Successful with issues | Unsuccessful;
