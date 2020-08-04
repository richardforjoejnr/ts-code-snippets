Initial 
====================

A new repo from scratch
---------------------


Say you’ve just got some data from a collaborator and are about to start exploring it.

Create a directory to contain the project.
Go into the new directory.
Type git init.
Write some code.
Type git add to add the files (see the typical use page).
Type git commit.

source: https://kbroman.org/github_tutorial/pages/init.html

Connect it to github
---------------------

Go to github.
Log in to your account.
Click the new repository button in the top-right. You’ll have an option there to initialize the repository with a README file, but I don’t.
Click the “Create repository” button.
Now, follow the second set of instructions, “Push an existing repository…”

$ git remote add origin git@github.com:username/new_repo
$ git push -u origin master

### Problems
Problems: “fatal: refusing to merge unrelated histories”
Solution: git pull origin master --allow-unrelated-histories

