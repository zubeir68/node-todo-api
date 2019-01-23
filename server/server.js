const express = require("express");
const bodyParser = require("body-parser");
const { ObjectID } = require("mongodb"); //check
const { mongoose } = require("./db/mongoose");
const { Todo } = require("./models/todo");
const { User } = require("./models/user");

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

//POST /todos
app.post("/todos", (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

//GET /todos
app.get("/todos", (req, res) => {
  Todo.find().then(
    todos => {
      res.send({ todos });
    },
    err => {
      res.status(400).send(err);
    }
  );
});

//POST /users
app.post("/users", (req, res) => {
  let user = new User({
    email: "zubeir.mohamed@outlook.de"
  });

  user.save().then(
    doc => {
      res.status(200).send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

//GET /todos/:id
app.get("/todos/:id", (req, res) => {
  let id = req.params.id;

  if (!ObjectID.isValid(id)) { //check
    return res.status(404).send(); //check
  }                                  //check

  Todo.findById(id).then(todo => {
      if(!todo) {
         return res.status(404).send();
      }
      return res.send({todo});
      
  }).catch(e => res.status(400).send())

});

//DELETE /todo/:id
app.delete('todos/:id', (req,res) => {
  let id = req.params.id;

  if(!ObjectID.isValid(id)) {
   return res.status(400).send();
  }
  Todo.findByIdAndRemove(id).then(todo => {
    if(!todo) {
     return res.status(404).send();
    }
   res.status(200).send();
  }, e => res.status(400).send());
});



app.listen(port, () => {
  console.log(`Started on port: ${port}`);
});

module.exports = {
  app
};
