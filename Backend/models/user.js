const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
    name: String,
    email: String
  });
  
  // Create a model from the schema
  

  module.exports = mongoose.model('User', userSchema);