'use strict'

const mongoose = require('mongoose');


// let today = new Date();
// let dd = today.getDate();
// let mm = today.getMonth() + 1; //January is 0!
//
// let yyyy = today.getFullYear();
// if (dd < 10) {
//   dd = '0' + dd;
// }
// if (mm < 10) {
//   mm = '0' + mm;
// }
// let formattedDate = dd + '/' + mm + '/' + yyyy;


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
    trim: true
  },
  // pasture: {
  //   type: String,
  //   required: true,
  //   trim: true
  // },
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
    trim: true
  },
  dam: {
    type: String,
    trim: true
  },
  status_date: {
    type: Date,
    trim: true
  },
  weight: {
    type: Number,
    trim: true
  },
  causeOfDeath: {
    type: String,
    trim: true
  },
  status_comments: {
    type: String,
    trim: true
  }
});

let Cow = mongoose.model('Cow', cowSchema);


module.exports = { Cow };