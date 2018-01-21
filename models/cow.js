'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let cowSchema = mongoose.Schema({
  tag_id: {
    type: String,
    unique: true,
    dropDups: true,
    required: true,
    minLength: 1,
    trim: true
  },
  type: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true,
    trim: true
  },
  pasture: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  status: {
    type: String,
    required: true,
    default: "Active"
  },
  sire: {
    type: String,
    required: true,
    trim: true
  },
  dam: {
    type: String,
    required: true,
    trim: true
  }
});

let Cow = mongoose.model('Cow', cowSchema);


module.exports = {
  Cow
};