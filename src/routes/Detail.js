import React from "react";
import { connect } from "react-redux";
import { remove } from "../store";

const Detail = ({ toDo, onBtnClick }) => {
  return (
    <>
      <h1>{toDo.text}</h1>
      <h5>Created at: {new Date(toDo.id).toISOString()}</h5>
      <button onClick={onBtnClick}>DEL</button>
    </>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return { toDo: state.find((toDo) => toDo.id === parseInt(id)) };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    match: {
      params: { id },
    },
    history: { push },
  } = ownProps;

  return {
    onBtnClick: () => {
      dispatch(remove(parseInt(id)));
      push("/");
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
