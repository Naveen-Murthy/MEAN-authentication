# Babel

First we need to install babel ad dev dependency.
Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

npm i @babel/preset-env babel-cli babel-watch @babel/core --save-dev

After installing dev dependencied we need to create a file ".babelrc"
We can also create that file using command

touch .babelrc

# MEAN Packages

After installing Babel we need to install
Express js

- Express.js is the backend part of MEAN and manages routing, sessions, HTTP requests, error handling, etc.

Mongoose

- Mongoose is a Node. js-based Object Data Modeling (ODM) library for MongoDB.

CORS

- Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.

npm i mongoose cors express

# Path

We need to install path to provide path to execute html file

npm i path

# Encryption

To add encryption
While creating user we are using bcryptjs package
npm i bcryptjs

# Start server

npm run start
