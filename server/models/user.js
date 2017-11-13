var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});
var Model = mongoose.model('User', userSchema);
module.exports = Model;
