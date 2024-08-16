import React from 'react';
import TodoList from '../components/TodoList';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-4">
      
      <TodoList />
    </Container>
  );
};

export default Home;
