'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let healthSchema = mongoose.Schema({
  cow_id: {
    type: ObjectId
  },
  treatmentDate: {
    type: Date,
    required: true,
    trim: true
  },
  medication: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true,
    trim: true
  },
  booster: {
    type: Date,
    required: true,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  diagnosis: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true,
    trim: true
  }
});

let Health = mongoose.model('Health', healthSchema);


module.exports = {
  Health
};
