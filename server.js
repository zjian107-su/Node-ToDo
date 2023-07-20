const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const router = express.Router();
const uuid = require("uuid");
const cors = require("cors");

const addDays = (date, days) => {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

let devMode = false;
let origin = devMode
  ? "http://localhost:4200"
  : "https://angular-daniel-todo.netlify.app";

app.use(bodyParser.json());
app.use(
  cors({
    origin,
  })
);

const todos = [
  {
    description: "Buy groceries",
    dueDate: addDays(new Date(), 1),
    priority: 1,
    status: "Not started",
    id: "713c60b2-aaab-4b17-be12-e0da198d4318",
  },
  {
    description: "Cook dinner",
    dueDate: addDays(new Date(), 2),
    priority: 2,
    status: "In progress",
    id: uuid.v4(),
  },
  {
    description: "Wash the dishes",
    dueDate: addDays(new Date(), 2),
    priority: 3,
    status: "Completed",
    id: uuid.v4(),
  },
  {
    description: "Do laundry",
    dueDate: addDays(new Date(), 2),
    priority: 1,
    status: "Not started",
    id: uuid.v4(),
  },
  {
    description: "Walk the dog",
    dueDate: addDays(new Date(), 2),
    priority: 2,
    status: "Completed",
    id: uuid.v4(),
  },
  {
    description: "Take out the trash",
    dueDate: addDays(new Date(), 2),
    priority: 1,
    status: "Completed",
    id: uuid.v4(),
  },
  {
    description: "Mow the lawn",
    dueDate: addDays(new Date(), 10),
    priority: 3,
    status: "Not started",
    id: uuid.v4(),
  },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  newTodo = {
    description: req.body.description,
    dueDate: addDays(new Date(), 7),
    priority: 1,
    status: "Not started",
    id: uuid.v4(),
  };

  todos.push(newTodo);
  res.json(newTodo);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.json({
      status: "Success",
      message: `Todo with id ${id} deleted successfully`,
      todos: todos,
    });
  } else {
    res.json({
      status: "Error",
      message: `Todo with id ${id} not found`,
      todos: todos,
    });
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos[index].description = description;
    res.json(todos);
  } else {
    res.json({
      status: "Error",
      message: `Todo with id ${id} not found`,
    });
  }
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Listening on port localhost:${PORT}`);
});
