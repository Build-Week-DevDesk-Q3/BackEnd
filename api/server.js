const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware');
const authRouter = require('../auth/authRouter');
const usersRouter = require('../users/userRouter');
const ticketsRouter = require('../tickets/ticketsRouter');

const server = express();



server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', authRouter);

server.use('/api/users', authenticate, usersRouter);
server.use('/api/tickets', authenticate, ticketsRouter);

module.exports = server;
