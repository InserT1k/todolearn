import React, { useState } from 'react';
import { updateTodo, deleteTodo } from '../services/todoService';
import { Card, Form, Button, Collapse } from 'react-bootstrap';

const TodoItem = ({ todo }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState(todo.description || '');

  const handleCheckboxChange = async () => {
    const updatedTodo = {
      ...todo,
      completed: !todo.completed
    };
    await updateTodo(todo._id, updatedTodo);
    window.location.reload(); 
  };

  const handleDelete = async () => {
    await deleteTodo(todo._id);
    window.location.reload(); 
  };

  const handleDescriptionChange = async () => {
    const updatedTodo = {
      ...todo,
      description
    };
    await updateTodo(todo._id, updatedTodo);
    setShowDescription(false);
  };

  const priorityClass = todo.priority === 'high' ? 'bg-danger' : todo.priority === 'medium' ? 'bg-warning' : 'bg-success';

  return (
    <Card className={`mb-2 ${priorityClass}`}>
      <Card.Body>
        <Card.Title>
          <Form.Check 
            type="checkbox" 
            label={<span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>}
            checked={todo.completed}
            onChange={handleCheckboxChange}
          />
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Created at: {new Date(todo.createdAt).toLocaleString()}</Card.Subtitle>
        {todo.dueDate && <Card.Subtitle className="mb-2 text-muted">Due by: {new Date(todo.dueDate).toLocaleString()}</Card.Subtitle>}
        <Button onClick={() => setShowDescription(!showDescription)} aria-controls="description-collapse" aria-expanded={showDescription}>
          {showDescription ? 'Hide Details' : 'Show Details'}
        </Button>
        <Collapse in={showDescription}>
          <div id="description-collapse" className="mt-2">
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button className="mt-2" onClick={handleDescriptionChange}>
              Save Description
            </Button>
          </div>
        </Collapse>
        <Button variant="danger" className="mt-2" onClick={handleDelete}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default TodoItem;
