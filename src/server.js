const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const router = express.Router();
const uuid = require("uuid");

app.use(bodyParser.json());

const todos = [
  {
    id: "1",
    description: "Buy groceries",
  },
  {
    id: "2",
    description: "Do laundry",
  },
];

router.get("/", (req, res) => {
  res.json(todos);
});

router.post("/", (req, res) => {
  const { description } = req.body;
  newTodo = { description, id: uuid.v4() };
  todos.push(newTodo);
  res.json(newTodo);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // const type = typeof id;
  // res.json({ type });

  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos.splice(index, 1);
    res.json({
      status: "Success",
      message: `Todo with id ${id} deleted successfully`,
    });
  } else {
    res.json({
      status: "Error",
      message: `Todo with id ${id} not found`,
    });
  }
});

router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  const index = todos.findIndex((todo) => todo.id === id);

  if (index !== -1) {
    todos[index].description = description;
    res.json(todos[index]);
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
