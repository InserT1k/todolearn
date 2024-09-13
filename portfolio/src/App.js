import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Todo from './pages/Todo';
import Swapi from './pages/Swapi';
import 'antd/dist/reset.css';
import './App.css'; // Додамо власні стилі

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/swapi" element={<Swapi />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
