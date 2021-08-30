import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BooksPreloader from "../../components/preloaders/BooksPreloader";
import { Link } from "react-router-dom";
import { fetchAuthUser, fetchRemoveBook } from "../../store/authUserSlice";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCreateBook from "./UserCreateBook";
import UserDeleteBook from "./UserDeleteBook";

const User = () => {
  const dispatch = useDispatch();

  const { user, isLoading } = useSelector(
    ({ authUser }) => ({
      user: authUser.user,
      isLoading: authUser.isLoading,
      error: authUser.error,
    }),
    shallowEqual
  );

  const { nickname, email, created_at, books } = user;

  //modal toggle
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  return (
    <section className="user">
      <div className="container pt-4">
        <div className="row">
          <div className="col-8 m-auto">
            {isLoading ? (
              <BooksPreloader />
            ) : (
              <>
                <h3 className="text-center">{nickname} profile</h3>
                <p className="lead mt-4">Your personal data:</p>
                <div>Nickname: {nickname}</div>
                <div>Email: {email}</div>
                <div>Registration date: {created_at}</div>

                {books ? (
                  <ul className="list-group mt-4">
                    <div className="d-flex justify-content-between p-3">
                      <h5>Your books: </h5>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="btn btn-success btn-sm mr-2 flex-grow-0 col-1"
                      >
                        Add
                      </button>
                    </div>

                    <UserCreateBook
                      show={showCreateModal}
                      setShow={setShowCreateModal}
                    />

                    {books.map((book) => (
                      <li
                        key={book.id}
                        className="list-group-item d-flex justify-content-between"
                      >
                        <Link to={"/books/" + book.slug}>{book.title}</Link>
                        <div className="actions">
                          <button
                            className="btn btn-danger btn-sm mr-2"
                            onClick={() => {
                              setShowDeleteModal(true);
                            }}
                          >
                            Delete
                          </button>

                          <UserDeleteBook
                            show={showDeleteModal}
                            setShow={setShowDeleteModal}
                            id={book.id}
                          />

                          <button className="btn btn-primary btn-sm">
                            Edit
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You dont have any books</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default User;
