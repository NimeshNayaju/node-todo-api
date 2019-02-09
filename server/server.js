require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user.js');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// adding an individual resource 
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

// getting an individual resource
app.get('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate id using isValid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// Deleting a resource
app.delete('/todos/:id', (req, res) => {
  // get the id
  var id = req.params.id;
  // validate the id -> return a 404 if not valid
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  // remove todo by id
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// Updating a resource
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  // updates are stored in body
  // pick takes an object and an array of properties (that you want the user to be able to update)
  // and pulls that off of req.body and adds them to body
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  }); 
});

app.listen(port, () => {
  console.log(`Starting on port ${port}`);
});
// Postman lets you create HTTP request and fire them off, that makes it real easy to test that everything you're writing is working correctly

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

module.exports = {
  app
};






