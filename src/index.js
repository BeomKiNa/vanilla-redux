import { createStore } from "redux";
const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      const newToDoObj = { text: action.text, id: Date.now() };
      return [newToDoObj, ...state];
    case DELETE_TODO:
      const cleanToDos = state.filter((toDo) => toDo.id !== action.id);
      return cleanToDos;
    default:
      return state;
  }
};

const toDoStore = createStore(reducer);

const dispatchAddToDo = (text) => {
  toDoStore.dispatch(addToDo(text));
};

const dispatchDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  toDoStore.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = toDoStore.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.id = toDo.id;
    li.innerText = toDo.text;
    btn.innerText = "❌";
    btn.addEventListener("click", dispatchDeleteToDo);
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

toDoStore.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  if (!toDo) return;
  dispatchAddToDo(toDo);
  input.value = "";
  input.focus();
};

form.addEventListener("submit", onSubmit);
