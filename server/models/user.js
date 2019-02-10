const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// User model
// {
//   email: 'nimeshnayaju@gmail.com',
//   password: 'faesfajsdfkads231f',
//   // array of login tokens(objects)
//   tokens: {
//     access: 'auth',
//     token: 'fsakdfhaksdhuf132kh'
//   }
// };

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

// returns only id and email to the JSON body
UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  // user.tokens.push({access, token});
  user.tokens = user.tokens.concat([{access, token}]);
  return user.save().then(() => {
    return token;
  });
};

var User = mongoose.model('User', UserSchema);

// var newUser = new User({
//   email: 'nimeshnayaju@gmail.com'
// });

// newUser.save().then((doc) => {
//   console.log('User saved', doc);
// }, (e) => {
//   console.log('Unable to save user')
// })

module.exports = {
  User
};