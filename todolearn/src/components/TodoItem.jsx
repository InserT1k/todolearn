import React from 'react';
import { TableCell, TableRow, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const TodoItem = ({ todo, onEdit, onDelete, onToggle }) => {
  const handleCheckboxChange = () => {
    onToggle(todo._id);
  };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <Checkbox checked={todo.completed} onChange={handleCheckboxChange} />
      </TableCell>
      <TableCell>{todo.title}</TableCell>
      <TableCell>{new Date(todo.createdAt).toLocaleString()}</TableCell>
      <TableCell>{todo.dueDate ? new Date(todo.dueDate).toLocaleString() : 'No Due Date'}</TableCell>
      <TableCell>{todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}</TableCell>
      <TableCell>
        <IconButton color="primary" onClick={() => onEdit(todo)}>
          <EditIcon />
        </IconButton>
        <IconButton color="secondary" onClick={() => onDelete(todo._id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default TodoItem;
