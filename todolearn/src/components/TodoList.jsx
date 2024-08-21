import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import {
  Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, Box, Typography, TextField, MenuItem,
} from '@mui/material';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import TodoItem from './TodoItem';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos.sort((a, b) => a.completed - b.completed));
    };
    fetchTodos();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedTodo(null);
  };

  const TodoSchema = Yup.object().shape({
    title: Yup.string().min(5, 'Title must be at least 5 characters long').required('Title is required'),
    description: Yup.string().min(5, 'Description must be at least 5 characters long'),
    dueDate: Yup.date().nullable().required('Due Date is required'),
  });

  const handleFormSubmit = async (values, { resetForm }) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate ? values.dueDate.toISOString() : null,
    };

    if (selectedTodo) {
      await updateTodo(selectedTodo._id, formattedValues);
      setTodos(todos.map(t => (t._id === selectedTodo._id ? { ...selectedTodo, ...formattedValues } : t)));
    } else {
      const newTask = await createTodo(formattedValues);
      setTodos([...todos, newTask]);
    }

    handleClose();
    resetForm();
  };

  const handleEdit = (todo) => {
    setSelectedTodo({
      ...todo,
      dueDate: dayjs(todo.dueDate)
    });
    handleOpen();
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
        >
          <Typography variant="h6" component="h2" gutterBottom>
            {selectedTodo ? 'Edit Todo' : 'Create Todo'}
          </Typography>
          <Formik
            initialValues={{
              title: selectedTodo?.title || '',
              description: selectedTodo?.description || '',
              dueDate: selectedTodo?.dueDate || null,
              priority: selectedTodo?.priority || 'medium',
            }}
            validationSchema={TodoSchema}
            onSubmit={handleFormSubmit}
            enableReinitialize
          >
            {({ errors, touched, setFieldValue }) => (
              <Form>
                <Field
                  as={TextField}
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
                />
                <Field
                  as={TextField}
                  name="description"
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={3}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    label="Due Date"
                    value={selectedTodo?.dueDate || null}
                    onChange={(value) => setFieldValue('dueDate', value)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        margin="normal"
                        required
                        error={touched.dueDate && Boolean(errors.dueDate)}
                        helperText={touched.dueDate && errors.dueDate}
                      />
                    )}
                  />
                </LocalizationProvider>
                <Field
                  as={TextField}
                  name="priority"
                  select
                  label="Priority"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Field>
                <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                  {selectedTodo ? 'Save Changes' : 'Add Todo'}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Container>
  );
};

export default TodoList;
