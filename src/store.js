import { createStore } from "redux";
import { createAction } from "@reduxjs/toolkit";

const TODO_LIST = "TODO_LIST";

const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

const reducer = (state = [], action) => {
  console.log(state, action);
  switch (action.type) {
    case addToDo.type:
      return [{ text: action.payload, id: Date.now() }, ...state];
    case deleteToDo.type:
      return state.filter((toDo) => toDo.id !== action.payload);
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
