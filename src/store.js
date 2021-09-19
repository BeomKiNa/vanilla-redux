import { configureStore, createSlice } from "@reduxjs/toolkit";

const TODO_LIST = "TODO_LIST";

const initState = JSON.parse(localStorage.getItem(TODO_LIST)) || [];

const toDos = createSlice({
  name: "toDosReducer",
  initialState: initState,
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

const store = configureStore({ reducer: toDos.reducer });

store.subscribe(() =>
  localStorage.setItem(TODO_LIST, JSON.stringify(store.getState()))
);

export const { add, remove } = toDos.actions;

export default store;
