// set up variables to require npms
const path = require('path')
const express = require('express')
const session = require('express-session')
const handlebars = require('expresss-handlebars')
const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;



