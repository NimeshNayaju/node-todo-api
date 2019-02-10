const mongoose = require('mongoose');
const validator = require('validator');

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

var User = mongoose.model('User', {
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