Api Mocker
====================

Setup from scratch
---------------------

npm install apimocker --save-dev
Create the following folders:
mockDirectory: Create your mock jsons in this folder.
staticDirectory: Used for mocking static files like images etc . If data in your json links to static file, you can mock that using this.
apimocker: copy the apimocker.json file and amend accordingly



Connect it to github
---------------------



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