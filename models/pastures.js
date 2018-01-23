'use strict'

const mongoose = require('mongoose');


//set up the schema/ structure of data
let pastureSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  comments: {
    type: String,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

let Pasture = mongoose.model('Pasture', pastureSchema);


module.exports = {
  Pasture
};