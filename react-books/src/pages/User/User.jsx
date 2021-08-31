import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BooksPreloader from "../../components/preloaders/BooksPreloader";
import { fetchAuthUser } from "../../store/authUserSlice";
import "bootstrap/dist/css/bootstrap.min.css";
import UserCreateBook from "./UserBookForms/UserCreateBook";
import UserBookSingle from "./UserBookSingle";
import { fetchTags } from "../../store/tagsSlice";

const User = () => {
  const dispatch = useDispatch();

  const { user, isLoading, tags } = useSelector(
    ({ authUser, tags }) => ({
      user: authUser.user,
      isLoading: authUser.isLoading,
      error: authUser.error,
      tags: tags.tags,
    }),
    shallowEqual
  );

  const { nickname, email, created_at, books } = user;

  //modal toggle
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    dispatch(fetchAuthUser());
    if (!tags.length) {
      dispatch(fetchTags());
    }
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

                    {books.map((book) => (
                      <UserBookSingle key={book.id} {...book} />
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

      <UserCreateBook
        show={showCreateModal}
        setShow={setShowCreateModal}
        tags={tags}
      />
    </section>
  );
};

export default User;
