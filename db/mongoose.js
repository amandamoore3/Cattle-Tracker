'use strict'

//CONNECTS TO MONGO DB
let mongooseConnect = require('mongoose');
mongooseConnect.Promise = global.Promise;
mongooseConnect.connect('mongodb://localhost:27017/Cattle-Tracker');

module.exports = { mongooseConnect };