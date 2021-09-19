import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { remove } from "../store";

function ToDo({ text, id, deleteToDo }) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={deleteToDo}>❌</button>
    </li>
  );
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteToDo: () => dispatch(remove(ownProps.id)),
  };
};

export default connect(null, mapDispatchToProps)(ToDo);
