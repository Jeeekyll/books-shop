import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthUser} from "../../store/reducers/authUser";
import BooksPreloader from "../../components/preloaders/BooksPreloader";
import {Link} from "react-router-dom";

const User = () => {
  const dispatch = useDispatch();
  const {user, isLoading, error} = useSelector(({authUser}) => ({
    user: authUser.authUser,
    isLoading: authUser.isLoading,
    error: authUser.error,
  }));

  const {nickname, email, created_at, books} = user;

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, [])


  return (
    <section className="user">
      <div className="container pt-4">
        <div className="row">
          <div className="col-6 m-auto">
            {isLoading ?
              <BooksPreloader/>
              :
              <>
                <h3 className="text-center">
                  {nickname} profile
                </h3>
                <p className="lead">Your info:</p>
                <div>Nickname: {nickname}</div>
                <div>Email: {email}</div>
                <div>Registration date: {created_at}</div>

                {books ?
                  <ul className="list-group mt-4">
                    <h5>Your books: </h5>
                    {books.map(book =>
                      <li className="list-group-item d-flex justify-content-between">
                        {book.title}
                        <Link to={"/books/" + book.slug}>
                          Read more
                        </Link>
                      </li>
                    )}
                  </ul>
                  :
                  <p>You dont have any books</p>
                }
              </>


            }
          </div>

        </div>

      </div>
    </section>
  );
}

export default User;