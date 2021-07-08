const express = require('express');
require('dotenv').config();

const actionRouters = require('./data/routers/actionRouters.js');
const projectRouters = require('./data/routers/projectRouters');
const port = process.env.PORT || 4000;
const server = express();

server.use(express.json());

server.use('/api/actions', actionRouters);
server.use('/api/projects', projectRouters);

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
  });

