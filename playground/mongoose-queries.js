const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5c58e76eb5aeeb8c114fa0e5';

if (!ObjectID.isValid(id)) {
  return console.log('ID not valid');
}

User.findById('c4358ba9770417426457590').then((user) => {
  if (!user) {
    return console.log('Unable to find the user');
  }

  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
});

// find all docuemts that matches the provided conditions
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });

// find one document
// Todo.find({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// find one document by id
// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo', todo);
// }).catch((e) => console.log(e));

