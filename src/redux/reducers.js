import {
    FETCH_DATA_REQUEST,
    FETCH_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    CLEAR_DATA,
  } from './actions';
  
  const initialState = {
    loading: false,
    data: null,
    error: null,
  };
  
  export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_DATA_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_DATA_SUCCESS:
        return { ...state, loading: false, data: action.payload };
      case FETCH_DATA_FAILURE:
        return { ...state, loading: false, error: action.error };
      case CLEAR_DATA:
        return { ...state, data: null };
      default:
        return state;
    }
  };
  