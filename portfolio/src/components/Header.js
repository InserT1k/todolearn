import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Menu mode="horizontal" theme="dark">
      <Menu.Item key="home">
        <Link to="/">Головна</Link>
      </Menu.Item>
      <Menu.Item key="todo">
        <Link to="/todo">Список TODO</Link>
      </Menu.Item>
      <Menu.Item key="swapi">
        <Link to="/swapi">Персонажі SWAPI</Link>
      </Menu.Item>
    </Menu>
  );
}

export default Header;
