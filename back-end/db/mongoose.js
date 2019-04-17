'use strict'

//CONNECTS TO MONGO DB
let mongooseConnect = require('mongoose');
mongooseConnect.Promise = global.Promise;
mongooseConnect.connect('mongodb://amandamoore3:<password>.mlab.com:15124/cattletracks', { useNewUrlParser: true });
mongooseConnect.set('useCreateIndex', true);

module.exports = { mongooseConnect };