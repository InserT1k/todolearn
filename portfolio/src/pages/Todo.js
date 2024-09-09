import React, { useState } from 'react';
import { Input, Button, List, Typography, Row, Col, Checkbox, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { Title } = Typography;

function Todo() {
  const [todos, setTodos] = useState([
    { text: 'Завдання 1: Оновити резюме', completed: false },
    { text: 'Завдання 2: Додати нові проекти', completed: false },
    { text: 'Завдання 3: Переглянути документацію React', completed: false },
    { text: 'Завдання 4: Зробити бекап даних', completed: false },
    { text: 'Завдання 5: Налаштувати CI/CD', completed: false },
    { text: 'Завдання 6: Додати API інтеграцію', completed: false },
    { text: 'Завдання 7: Відправити звіт', completed: false },
    { text: 'Завдання 8: Виправити баги на сайті', completed: false },
    { text: 'Завдання 9: Оновити дизайн', completed: false },
    { text: 'Завдання 10: Перевірити безпеку системи', completed: false },
  ]);
  const [task, setTask] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editTaskText, setEditTaskText] = useState('');

  // Додавання завдання
  const addTodo = () => {
    if (task) {
      setTodos([...todos, { text: task, completed: false }]);
      setTask('');
    }
  };

  // Видалення завдання
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // Позначення завдання виконаним
  const toggleComplete = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  // Відкриття модального вікна для редагування
  const openEditModal = (index) => {
    setEditingTask(index);
    setEditTaskText(todos[index].text);
    setEditModalVisible(true);
  };

  // Збереження відредагованого завдання
  const saveEditedTask = () => {
    const updatedTodos = [...todos];
    updatedTodos[editingTask].text = editTaskText;
    setTodos(updatedTodos);
    setEditModalVisible(false);
    setEditingTask(null);
  };

  return (
    <div className="page-content">
      <Row>
        <Col span={24}>
          <Title>Список TODO</Title>
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Введіть нове завдання"
            style={{ width: '600px', marginRight: '10px', fontSize: '16px' }}
          />
          <Button type="primary" onClick={addTodo} style={{ fontSize: '16px', height: '40px' }}>
            Додати
          </Button>

          <List
            bordered
            dataSource={todos}
            renderItem={(item, index) => (
              <List.Item
                actions={[
                  <Checkbox
                    checked={item.completed}
                    onChange={() => toggleComplete(index)}
                    style={{ fontSize: '16px' }}
                  >
                    {item.completed ? 'Виконано' : 'Не виконано'}
                  </Checkbox>,
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => openEditModal(index)}
                    style={{ fontSize: '16px', height: '40px' }}
                  >
                    Редагувати
                  </Button>,
                  <Button
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => deleteTodo(index)}
                    style={{ fontSize: '16px', height: '40px' }}
                  >
                    Видалити
                  </Button>,
                ]}
              >
                <Typography.Text
                  delete={item.completed}
                  style={{ fontSize: '18px', wordBreak: 'break-word' }}
                >
                  {item.text}
                </Typography.Text>
              </List.Item>
            )}
            style={{ marginTop: '20px', width: '800px', fontSize: '18px' }} // Збільшено ширину контейнера
          />
        </Col>
      </Row>

      {/* Модальне вікно для редагування завдання */}
      <Modal
        title="Редагувати завдання"
        visible={editModalVisible}
        onOk={saveEditedTask}
        onCancel={() => setEditModalVisible(false)}
        okText="Зберегти"
        cancelText="Скасувати"
      >
        <Input
          value={editTaskText}
          onChange={(e) => setEditTaskText(e.target.value)}
          style={{ fontSize: '16px', height: '40px' }}
        />
      </Modal>
    </div>
  );
}

export default Todo;
