import React from 'react';
import { Typography, Row, Col, Avatar, Divider } from 'antd';

const { Title, Paragraph } = Typography;

function Home() {
  return (
    <div className="page-content">
      <Row gutter={16}>
        <Col span={6}>
          <Avatar size={200} src="https://via.placeholder.com/200" />
        </Col>
        <Col span={18}>
          <Title>Іваненко Дмитро</Title>
          <Paragraph>
            Привіт! Мене звати Дмитро Іваненко, я досвідчений розробник з більш ніж 5-річним досвідом у розробці веб-додатків.
            Я спеціалізуюся на створенні сучасних і безпечних рішень на основі JavaScript, React, Node.js, Docker та Kubernetes.
          </Paragraph>
          <Title level={2}>Навички</Title>
          <Paragraph>- JavaScript, React, Node.js</Paragraph>
          <Paragraph>- Docker, Kubernetes, AWS</Paragraph>
          <Paragraph>- CI/CD, Jenkins</Paragraph>
          <Paragraph>- PostgreSQL, MongoDB</Paragraph>
          <Divider />
          <Title level={2}>Досвід роботи</Title>
          <Paragraph>Старший розробник у компанії "TechSolutions" з 2020 року.</Paragraph>
          <Paragraph>Розробник у "WebDev" з 2017 по 2020 рік.</Paragraph>
        </Col>
      </Row>
    </div>
  );
}

export default Home;
