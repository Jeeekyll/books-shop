import React, { memo } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchRemoveBook } from "../../../store/booksSlice";

const UserDeleteBook = ({ id, show, setShow }) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector(({ books }) => ({
    isLoading: books.isLoading,
  }));

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Delete book</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer>
        <button
          disabled={isLoading}
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

export default memo(UserDeleteBook);
