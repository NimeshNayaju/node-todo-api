const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove
// pass in a query, and removes all the matching records

// this removes all the todos documents
// Todo.remove({}).then((result) => {
//   console.log(result);
// }); 

// Todo.findOneAndRemove({_id: '5c5f13bd824d9cb8246cf2d8'}).then((todo) => {
//   console.log(todo);
// });

Todo.findByIdAndRemove('5c5f13bd824d9cb8246cf2d8').then((todo) => {
  console.log(todo);
});
