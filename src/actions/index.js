import axios from "axios";
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

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchTodos = () => async (dispatch) => {
  dispatch({
    type: FETCH_TODOS,
  });

  return axios
    .get(apiUrl)
    .then((response) => {
      dispatch({
        type: FETCH_TODOS_SUCCESS,
        todos: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: FETCH_TODOS_ERROR,
        errorText: error.msg,
      });
    });
};

export const createTodo = (data) => async (dispatch) => {
  dispatch({
    type: CREATE_TODO,
  });

  return axios
    .post(apiUrl, data)
    .then((response) => {
      dispatch({
        type: CREATE_TODO_SUCCESS,
        todo: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: CREATE_TODO_ERROR,
        errorText: error.msg,
      });
    });
};

export const updateTodo = (id, data) => async (dispatch) => {
  dispatch({
    type: UPDATE_TODO,
  });

  return axios
    .patch(`${apiUrl}/${id}`, data)
    .then((response) => {
      dispatch({
        type: UPDATE_TODO_SUCCESS,
        todo: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: UPDATE_TODO_ERROR,
        errorText: error.msg,
      });
    });
};

export const deleteTodo = (id) => async (dispatch) => {
  dispatch({
    type: DELETE_TODO,
  });

  return axios
    .delete(`${apiUrl}/${id}`)
    .then(() => {
      dispatch({
        type: DELETE_TODO_SUCCESS,
        id,
      });
    })
    .catch((error) => {
      dispatch({
        type: DELETE_TODO_ERROR,
        errorText: error.msg,
      });
    });
};
