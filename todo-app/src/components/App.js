import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodoRequest,
  loadTodosRequest,
  deleteTodoRequest,
  toggleTodoRequest,
  editTodoRequest,
  clearTodosRequest,
} from '../actions/todoActions';

function App() {
  const [todo, setTodo] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTodosRequest());
  }, [dispatch]);

  const addTodo = () => {
    if (todo.trim()) {
      dispatch(addTodoRequest(todo));
      setTodo('');
    }
  };

  const deleteTodo = (id) => {
    dispatch(deleteTodoRequest(id));
  };

  const toggleTodo = (id) => {
    dispatch(toggleTodoRequest(id));
  };

  const editTodo = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const saveEditTodo = () => {
    dispatch(editTodoRequest(editId, editText));
    setEditId(null);
    setEditText('');
  };

  const clearTodos = () => {
    dispatch(clearTodosRequest());
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#bde4e7' }}>
      <h1>TODO</h1>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        style={{ padding: '10px', width: '300px', borderRadius: '5px' }}
      />
      <button onClick={addTodo} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px' }}>
        Додати
      </button>
      <h2 style={{ marginTop: '20px' }}>TODOS</h2>
      <div>
        {todos.map((item) => (
          <div key={item.id} style={{ backgroundColor: '#f7caca', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleTodo(item.id)}
            />
            {editId === item.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={saveEditTodo}>Зберегти</button>
              </>
            ) : (
              <>
                {item.text}
                <button onClick={() => editTodo(item.id, item.text)}>Редагувати</button>
                <button onClick={() => deleteTodo(item.id)}>Видалити</button>
              </>
            )}
          </div>
        ))}
      </div>
      <button onClick={clearTodos} style={{ marginTop: '20px', padding: '10px', borderRadius: '5px' }}>
        Очистити всі
      </button>
      <footer style={{ marginTop: '20px' }}>Всього: {todos.length}</footer>
    </div>
  );
}

export default App;
