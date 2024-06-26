const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();

//-- data ---

let todos = [];

//---- middleware -----

app.use(express.json());
app.use(cors());
// ---- routes ----
app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
app.delete("/todos/:id", (req, res) => {
  //   const todoIndex = findIndex(todos, parseInt(req.params.id));
  const todoIndex = todos.findIndex((todo) => todo.id === req.params.id);
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos = todos.filter((todo) => todo.id !== req.params.id);
    res.status(200).send();
  }
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// -- app listener --

app.listen(3000, () => {
  console.log("APP running on port 3000");
});

// model

function todoModel() {}
