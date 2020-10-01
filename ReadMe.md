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

Setup package json
---------------------

npm init -y
npm install typescript --save-dev
npm install @types/node --save-dev

npx tsc --init --rootDir src --outDir build \
--esModuleInterop --resolveJsonModule --lib es6 \
--module commonjs --allowJs true --noImplicitAny true

mkdir src
touch src/index.ts

npx tsc

Useful configurations and scripts
---------------------

npm install --save-dev ts-node nodemon
Add a nodemon.json config - update with nodemon.json 
add script to package.json - "start:dev": "nodemon"

Add a build script
---------------------

npm install --save-dev rimraf
add build script & production setup script  
"build": "rimraf ./build && tsc
"start": "npm run build && node build/index.js"

source: https://khalilstemmler.com/blogs/typescript/node-starter-project/

Script overview
---------------------
npm run start:dev
Starts the application in development using nodemon and ts-node to do cold reloading.

npm run build
Builds the app at build, cleaning the folder first.

npm run start
Starts the app in production by first building the project with npm run build, and then executing the compiled JavaScript at build/index.js

npm run polling
Starts Express server and runs function to dynamically update json response every 5 seconds - endpoint: http://localhost:8055/endpoint?id=TEST