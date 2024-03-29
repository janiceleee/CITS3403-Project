var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


var Account = new Schema({
      firstname: String,
      lastname: String,
      email: String,
      username: {type:String, require:true},
      password: {type:String, require:true},
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
