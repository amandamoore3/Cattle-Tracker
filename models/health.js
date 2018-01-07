'use strict'

const mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;


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
    type: String
  },
  dosage: {
    type: String,
    trim: true
  },
  booster: {
    type: Date,
    trim: true
  },
  dateCreated: {
    type: Date,
    required: true,
    default: Date.now()
  },
  diagnosis: {
    type: String
  },
  comments: {
    type: String,
    trim: true
  }
});

let Health = mongoose.model('Health', healthSchema);


module.exports = {
  Health
};
