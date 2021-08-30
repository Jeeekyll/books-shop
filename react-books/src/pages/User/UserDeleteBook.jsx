import React from "react";
import Modal from "react-bootstrap/Modal";
import { fetchRemoveBook } from "../../store/authUserSlice";
import { useDispatch } from "react-redux";

const UserDeleteBook = ({ id, show, setShow }) => {
  const dispatch = useDispatch();

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete book</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <button
          className="btn btn-danger mt-4"
          onClick={() => {
            dispatch(fetchRemoveBook(id));
          }}
        >
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteBook;
