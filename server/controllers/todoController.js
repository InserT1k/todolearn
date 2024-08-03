const Todo = require('../models/todoModel');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTodo = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;

  const todo = new Todo({
    title,
    description,
    dueDate,
    priority
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.title = title ?? todo.title;
    todo.description = description ?? todo.description;
    todo.dueDate = dueDate ?? todo.dueDate;
    todo.priority = priority ?? todo.priority;
    todo.completed = completed ?? todo.completed;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
