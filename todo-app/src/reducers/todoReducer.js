const initialState = {
    todos: [],
    loading: false,
    error: null,
  };
  
  const todoReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_TODO_SUCCESS':
        return { ...state, todos: [...state.todos, action.payload] };
      case 'LOAD_TODOS_REQUEST':
        return { ...state, loading: true };
      case 'LOAD_TODOS_SUCCESS':
        return { ...state, loading: false, todos: action.payload };
      case 'LOAD_TODOS_FAILURE':
        return { ...state, loading: false, error: action.error };
      case 'DELETE_TODO_SUCCESS':
        return { ...state, todos: state.todos.filter((todo) => todo.id !== action.payload) };
      case 'TOGGLE_TODO_SUCCESS':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
          ),
        };
      case 'EDIT_TODO_SUCCESS':
        return {
          ...state,
          todos: state.todos.map((todo) =>
            todo.id === action.payload.id ? { ...todo, text: action.payload.newText } : todo
          ),
        };
      case 'CLEAR_TODOS_SUCCESS':
        return { ...state, todos: [] };
      default:
        return state;
    }
  };
  
  export default todoReducer;
  