import * as http from 'http';
import App from './app';

require('dotenv').config();

App.start();

module.exports = App;