import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

function CustomFooter() {
  return (
    <Footer>
      <p>Контакти: example@email.com | Телефон: +380 67 123 45 67</p>
    </Footer>
  );
}

export default CustomFooter;
