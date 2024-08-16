import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, TextField, MenuItem,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('medium');
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos.sort((a, b) => a.completed - b.completed));
    };
    fetchTodos();
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setNewTodo('');
    setNewDescription('');
    setDueDate(null);
    setPriority('medium');
    setSelectedTodo(null);
  };

  const handleClose = () => setOpen(false);

  const handleNewTodoSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim() && dueDate) {
      const newTask = selectedTodo
        ? await updateTodo(selectedTodo._id, { title: newTodo, description: newDescription, dueDate: dueDate.toISOString(), priority })
        : await createTodo({ title: newTodo, description: newDescription, dueDate: dueDate.toISOString(), priority });

      setTodos(selectedTodo ? todos.map(t => (t._id === newTask._id ? newTask : t)) : [...todos, newTask]);
      handleClose();
    } else {
      alert('Title and Due Date are required');
    }
  };

  const handleEdit = (todo) => {
    setNewTodo(todo.title);
    setNewDescription(todo.description);
    setDueDate(dayjs(todo.dueDate));
    setPriority(todo.priority);
    setSelectedTodo(todo);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleToggle = async (id) => {
    const todo = todos.find(t => t._id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };
    await updateTodo(id, updatedTodo);
    setTodos(todos.map(t => (t._id === id ? updatedTodo : t)));
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} sx={{ mb: 2 }}>
        Add Todo
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Completed</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map(todo => (
              <TodoItem key={todo._id} todo={todo} onEdit={handleEdit} onDelete={handleDelete} onToggle={handleToggle} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={open} onClose={handleClose}>
        <Box
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
          onSubmit={handleNewTodoSubmit}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {selectedTodo ? 'Edit Todo' : 'Create Todo'}
          </Typography>
          <TextField
            label="Title"
            variant="outlined"
            fullWidth
            margin="normal"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            required
          />
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            multiline
            rows={3}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Due Date"
              value={dueDate}
              onChange={(date) => setDueDate(date)}
              slotProps={{ textField: { fullWidth: true, margin: 'normal', required: true } }}
            />
          </LocalizationProvider>
          <TextField
            select
            label="Priority"
            variant="outlined"
            fullWidth
            margin="normal"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            {selectedTodo ? 'Save Changes' : 'Add Todo'}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default TodoList;
