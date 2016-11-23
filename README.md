# moskfy
CMS like Wordpress made in Node.js, React.js and Refux.

The purpose of this project is to build a CMS to up and running a website using node.js on the back-end, React on the admin pages and Handlebars as template engine for themes.

## Dependencies
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Bower](https://bower.io/)

## Install
In the project's root directory, install the Node dependencies
```bash
npm install
```

Then, the front-end dependencies through the Bower
```bash
bower install
```

## Run
First, start the database:
```bash
mongod
```
Then..
```bash
cd moskfy-core && npm start
```
This is not a best architecture, I know, but currently I do not have much time to improve that.
## Usage
The website will run at `http://localhost:3000` and the admin at `http://localhost:3333/admin`
