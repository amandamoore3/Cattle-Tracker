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
    required: true,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

let Pastures = mongoose.model('Pastures', pastureSchema);


module.exports = {
  Pastures
};
