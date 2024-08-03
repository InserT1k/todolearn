import React, { useEffect, useState } from 'react';
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/todoService';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaTrash, FaEye } from 'react-icons/fa';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('medium');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      setTodos(todos.sort((a, b) => a.completed - b.completed));
    };
    fetchTodos();
  }, []);

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleNewDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleNewTodoSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim() && dueDate) {
      const createdTodo = await createTodo({ title: newTodo, description: newDescription, dueDate: dueDate.toISOString(), priority });
      setTodos([...todos, createdTodo].sort((a, b) => a.completed - b.completed));
      setNewTodo('');
      setNewDescription('');
      setDueDate(null);
      setPriority('medium');
      setShowCreateModal(false);
    } else {
      alert("Title and Due Date are required");
    }
  };

  const handleShowDetailModal = (todo) => {
    setSelectedTodo({
      ...todo,
      dueDate: todo.dueDate ? new Date(todo.dueDate) : null
    });
    setShowDetailModal(true);
  };

  const handleDetailModalClose = () => {
    setShowDetailModal(false);
    setSelectedTodo(null);
  };

  const handleDetailUpdate = async (e) => {
    e.preventDefault();
    if (selectedTodo.title.trim() && selectedTodo.dueDate) {
      await updateTodo(selectedTodo._id, { ...selectedTodo, dueDate: selectedTodo.dueDate.toISOString() });
      setTodos(todos.map(todo => todo._id === selectedTodo._id ? selectedTodo : todo).sort((a, b) => a.completed - b.completed));
      handleDetailModalClose();
    } else {
      alert("Title and Due Date are required");
    }
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setSelectedTodo({
      ...selectedTodo,
      [name]: value
    });
  };

  const handleDetailDateChange = (date) => {
    setSelectedTodo({
      ...selectedTodo,
      dueDate: date
    });
  };

  const handleCheckboxChange = async (todo) => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    };
    await updateTodo(todo._id, updatedTodo);
    setTodos(todos.map(t => t._id === todo._id ? updatedTodo : t).sort((a, b) => a.completed - b.completed));
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter(todo => todo._id !== id));
  };

  return (
    <Container>
      <Button variant="primary" className="my-4" onClick={() => setShowCreateModal(true)}>
        Add Todo
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Completed</th>
            <th>Title</th>
            <th>Created At</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => (
            <tr key={todo._id}>
              <td>
                <Form.Check 
                  type="checkbox" 
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo)}
                />
              </td>
              <td style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</td>
              <td>{new Date(todo.createdAt).toLocaleString()}</td>
              <td>{todo.dueDate ? new Date(todo.dueDate).toLocaleString() : 'No Due Date'}</td>
              <td>{todo.priority}</td>
              <td>
                <Button variant="info" onClick={() => handleShowDetailModal(todo)}>
                  <FaEye />
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(todo._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Create Todo Modal */}
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleNewTodoSubmit}>
            <Form.Group controlId="formNewTodo">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new todo"
                value={newTodo}
                onChange={handleNewTodoChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formNewDescription" className="mt-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter description"
                value={newDescription}
                onChange={handleNewDescriptionChange}
              />
            </Form.Group>
            <Form.Group controlId="formDueDate" className="mt-2">
              <Form.Label>Due Date</Form.Label>
              <DatePicker
                selected={dueDate}
                onChange={(date) => setDueDate(date)}
                showTimeSelect
                dateFormat="Pp"
                placeholderText="Select a date"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPriority" className="mt-2">
              <Form.Label>Priority</Form.Label>
              <Form.Control
                as="select"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Add Todo
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Detail Todo Modal */}
      {selectedTodo && (
        <Modal show={showDetailModal} onHide={handleDetailModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Todo Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleDetailUpdate}>
              <Form.Group controlId="formEditTodo">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={selectedTodo.title}
                  onChange={handleDetailChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEditDescription" className="mt-2">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={selectedTodo.description}
                  onChange={handleDetailChange}
                />
              </Form.Group>
              <Form.Group controlId="formEditDueDate" className="mt-2">
                <Form.Label>Due Date</Form.Label>
                <DatePicker
                  selected={selectedTodo.dueDate ? new Date(selectedTodo.dueDate) : null}
                  onChange={handleDetailDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                  required
                />
              </Form.Group>
              <Form.Group controlId="formEditPriority" className="mt-2">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  as="select"
                  name="priority"
                  value={selectedTodo.priority}
                  onChange={handleDetailChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-2">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </Container>
  );
};

export default TodoList;
