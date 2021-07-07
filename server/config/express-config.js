// Configuração inicial do Express
require('dotenv').config();

// const User = require('./users/model/User');

const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

const usersRouter = require('../users/controller/user-controller');
app.use('/.users', usersRouter); // Definição de Router de usuários

module.exports = app;
