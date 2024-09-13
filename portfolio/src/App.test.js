import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Todo from './pages/Todo';
import '@testing-library/jest-dom';


describe('TODO додаток', () => {

  test('відображає заголовок "Список TODO"', () => {
    render(<Todo />);
    const titleElement = screen.getByText(/Список TODO/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('дозволяє введення букв та цифр у поле введення', () => {
    render(<Todo />);
    const inputElement = screen.getByPlaceholderText(/Введіть нове завдання/i);
    fireEvent.change(inputElement, { target: { value: 'Тест123' } });
    expect(inputElement.value).toBe('Тест123');
  });

  test('не додає порожнє завдання', () => {
    render(<Todo />);
    const addButton = screen.getByTestId('add-task-btn'); 
    fireEvent.click(addButton);
    const listItems = screen.queryAllByRole('listitem');
    expect(listItems.length).toBe(10);
  });

  test('додає нове завдання до списку', () => {
    render(<Todo />);
    const inputElement = screen.getByPlaceholderText(/Введіть нове завдання/i);
    fireEvent.change(inputElement, { target: { value: 'Нове завдання' } });
    const addButton = screen.getByTestId('add-task-btn'); 
    fireEvent.click(addButton);
    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(11);
    expect(screen.getByText(/Нове завдання/i)).toBeInTheDocument();
  });

  test('змінює статус завдання на виконано', () => {
    render(<Todo />);
    const checkbox = screen.getByTestId('checkbox-0'); 
    fireEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
  });

});
