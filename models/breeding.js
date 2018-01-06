'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let breedingSchema = mongoose.Schema({
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
  bull: {
    type: String,
    required: true,
    trim: true
  },
  technician: {
    type: String,
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

let Breeding = mongoose.model('Breeding', breedingSchema);


module.exports = {
  Breeding
};
