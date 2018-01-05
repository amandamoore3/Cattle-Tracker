'use strict'

const mongoose = require('mongoose');



//set up the schema/ structure of data
let cowSchema = mongoose.Schema({
  tag: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  },
  year: {
    type: Number,
    required: true,
    trim: true
  }
});

let cow = mongoose.model('Cow', cowSchema);


module.exports = {
  Cow
};
