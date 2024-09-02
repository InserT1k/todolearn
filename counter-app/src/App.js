import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const value = useSelector((state) => state.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Value: {value}</h1>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}

export default App;
