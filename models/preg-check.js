'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let pregCheckSchema = mongoose.Schema({
  cow_id: {
    type: ObjectId
  },
  date: {
    type: Date,
    required: true,
    trim: true
  },
  method: {
    type: String,
    required: true,
    trim: true
  },
  result: {
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

let PregCheck = mongoose.model('PregCheck', pregCheckSchema);


module.exports = {
  PregCheck
};
