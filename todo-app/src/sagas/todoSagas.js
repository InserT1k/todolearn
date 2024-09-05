import { call, put, takeLatest } from 'redux-saga/effects';
import {
  ADD_TODO_REQUEST,
  ADD_TODO_SUCCESS,
  LOAD_TODOS_REQUEST,
  LOAD_TODOS_SUCCESS,
  LOAD_TODOS_FAILURE,
  DELETE_TODO_REQUEST,
  DELETE_TODO_SUCCESS,
  TOGGLE_TODO_REQUEST,
  TOGGLE_TODO_SUCCESS,
  EDIT_TODO_REQUEST,
  EDIT_TODO_SUCCESS,
  CLEAR_TODOS_REQUEST,
  CLEAR_TODOS_SUCCESS,
} from '../actions/todoActions';

const apiLoadTodos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: 'Закінчити домашнє завдання', completed: false },
        { id: 2, text: 'Прочитати книгу', completed: true },
        { id: 3, text: 'Вивчити Redux-saga', completed: false },
        { id: 4, text: 'Прибрати кімнату', completed: false },
        { id: 5, text: 'Купити продукти', completed: true },
        { id: 6, text: 'Запланувати зустріч', completed: false },
        { id: 7, text: 'Піти на прогулянку', completed: false },
        { id: 8, text: 'Подивитися фільм', completed: true },
      ]);
    }, 1000);
  });
};

function* addTodoSaga(action) {
  try {
    const newTodo = { id: Date.now(), text: action.payload, completed: false };
    yield put({ type: ADD_TODO_SUCCESS, payload: newTodo });
  } catch (error) {
    console.error('Помилка додавання TODO:', error);
  }
}

function* loadTodosSaga() {
  try {
    const todos = yield call(apiLoadTodos);
    yield put({ type: LOAD_TODOS_SUCCESS, payload: todos });
  } catch (error) {
    yield put({ type: LOAD_TODOS_FAILURE, error });
  }
}

function* deleteTodoSaga(action) {
  try {
    yield put({ type: DELETE_TODO_SUCCESS, payload: action.payload });
  } catch (error) {
    console.error('Помилка видалення TODO:', error);
  }
}

function* toggleTodoSaga(action) {
  try {
    yield put({ type: TOGGLE_TODO_SUCCESS, payload: action.payload });
  } catch (error) {
    console.error('Помилка відмітки TODO:', error);
  }
}

function* editTodoSaga(action) {
  try {
    yield put({ type: EDIT_TODO_SUCCESS, payload: action.payload });
  } catch (error) {
    console.error('Помилка редагування TODO:', error);
  }
}

function* clearTodosSaga() {
  try {
    yield put({ type: CLEAR_TODOS_SUCCESS });
  } catch (error) {
    console.error('Помилка очищення TODO:', error);
  }
}

export function* watchTodoSagas() {
  yield takeLatest(ADD_TODO_REQUEST, addTodoSaga);
  yield takeLatest(LOAD_TODOS_REQUEST, loadTodosSaga);
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodoSaga);
  yield takeLatest(TOGGLE_TODO_REQUEST, toggleTodoSaga);
  yield takeLatest(EDIT_TODO_REQUEST, editTodoSaga);
  yield takeLatest(CLEAR_TODOS_REQUEST, clearTodosSaga);
}
