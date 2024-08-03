import React from 'react';
import TodoList from '../components/TodoList';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-4">
      <h1 className="my-4">Todo List</h1>
      <TodoList />
    </Container>
  );
};

export default Home;
