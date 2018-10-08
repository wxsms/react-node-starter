#!/usr/bin/env node

const app = require('./app');
const http = require('http');

const port = 3001;
app.set('port', port);

const server = http.createServer(app);

server.listen(port);