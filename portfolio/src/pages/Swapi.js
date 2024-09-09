import React, { useEffect, useState } from 'react';
import { Input, List, Typography, Row, Col } from 'antd';

const { Title } = Typography;

function Swapi() {
  const [people, setPeople] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (search) {
      fetch(`https://swapi.dev/api/people/?search=${search}`)
        .then(response => response.json())
        .then(data => setPeople(data.results));
    }
  }, [search]);

  return (
    <div className="page-content">
      <Row>
        <Col span={24}>
          <Title>Персонажі SWAPI</Title>
          <Input
            placeholder="Введіть ім'я персонажа"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '300px', marginBottom: '20px' }}
          />
          <List
            bordered
            dataSource={people}
            renderItem={(person) => (
              <List.Item>{JSON.stringify(person)}</List.Item>
            )}
            style={{ width: '100%' }}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Swapi;
