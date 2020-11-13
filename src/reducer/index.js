import {
  FETCH_TODOS,
  FETCH_TODOS_SUCCESS,
  FETCH_TODOS_ERROR,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_ERROR,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_ERROR,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_ERROR,
} from "../constants";

export const initialState = {
  todos: [],
  loading: false,
  errorText: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
    case CREATE_TODO:
    case UPDATE_TODO:
    case DELETE_TODO: {
      return {
        ...state,
        loading: true,
        errorText: null,
      };
    }

    case FETCH_TODOS_ERROR:
    case CREATE_TODO_ERROR:
    case UPDATE_TODO_ERROR:
    case DELETE_TODO_ERROR: {
      return {
        ...state,
        loading: false,
        errorText: action.errorText,
      };
    }
    case FETCH_TODOS_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: null,
        todos: action.todos,
      };
    }
    case CREATE_TODO_SUCCESS: {
      return {
        ...state,
        loading: false,
        errorText: null,
        todos: [...state.todos, action.todo],
      };
    }
    case UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        todos: state.todos.map((todo) => {
          if (todo.id === action.todo.id) {
            return action.todo;
          }

          return todo;
        }),
      });
    case DELETE_TODO_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        todos: state.todos.filter(({ id }) => id !== action.id),
      });

    default:
      return state;
  }
};

export default reducer;
