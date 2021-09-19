import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/ToDo";
import { add } from "../store";

const Home = ({ toDos, addToDo }) => {
  const [text, setText] = useState("");
  const textInput = useRef();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    addToDo(text);
    setText("");
    textInput.current.focus();
  };

  return (
    <>
      <h1>To Do</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          ref={textInput}
        />
        <input type="submit" value="Add" />
      </form>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </>
  );
};

const mapStateToProps = (state) => {
  return { toDos: state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (text) => dispatch(add(text)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
