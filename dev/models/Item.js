const mongoose = require('mongoose');

module.exports.interests = mongoose.model('interests', new mongoose.Schema ({
  name: { type: String },
  age:  { type: Number }
}));

module.exports.items = mongoose.model('tests', new mongoose.Schema ({
    name:    { type: String , required: true } ,
    age:     { type: Number , required: true } ,
}));


function isMyFieldRequired () {
  return typeof this.name === 'string' ? false : true
}
