// Configuração inicial do Express
require('dotenv').config();

const User = require('./users/model/User');

const express = require('express');

const app = express();

app.use(express.urlencoded({
  extended: true,
}));

app.use(express.json());

module.exports = app;
