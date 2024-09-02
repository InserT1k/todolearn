import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const [todo, setTodo] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const addTodo = () => {
    if (todo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: todo });
      setTodo('');
    }
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
      <button onClick={addTodo} style={{ marginLeft: '10px', padding: '10px', borderRadius: '5px' }}>Додати</button>
      <h2 style={{ marginTop: '20px' }}>TODOS</h2>
      <div>
        {todos.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#f7caca', margin: '10px 0', padding: '10px', borderRadius: '5px' }}>
            {item}
          </div>
        ))}
      </div>
      <footer style={{ marginTop: '20px' }}>
        Всього: {todos.length}
      </footer>
    </div>
  );
}

export default App;
