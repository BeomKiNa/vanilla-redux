import { createStore } from "redux";

const TODO_LIST = "TODO_LIST";
const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => ({
  type: ADD,
  text,
});

const deleteToDo = (id) => ({
  type: DELETE,
  id,
});

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return state;
  }
};

const initState = JSON.parse(localStorage.getItem(TODO_LIST)) || [];

const store = createStore(reducer, initState);

store.subscribe(() =>
  localStorage.setItem(TODO_LIST, JSON.stringify(store.getState()))
);

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
