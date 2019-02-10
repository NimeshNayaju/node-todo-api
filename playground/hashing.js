const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// using bcrypt to hash password
var password = '123abc';

// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$pBAwcgMk3wSUY00DLonBvePmVzj4TZoKH/v251Jk7cjIaLyzIWlP.';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});

// Using jsonwebtoken to create token
// var data = {
//   id: 2
// }

// var token = jwt.sign(data, '123ijk');
// console.log(token);

// var decoded = jwt.verify(token, '123ijk');
// console.log('Decoded', decoded);


// Using crypto-js to hash password
// var message = 'This is a password';
// var hash = SHA256(message).toString();

// console.log(`Password: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//   id: 4
// };

// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('Data was not changed.');
// } else {
//   console.log('Data was changed.')
// }

