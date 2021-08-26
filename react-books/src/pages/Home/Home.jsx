import React, {useCallback, useEffect, useMemo, useState} from "react";
import {fetchBooks} from "../../store/books";
import {useDispatch, useSelector} from "react-redux";
import {getPagesArray} from "../../utils/pages";
import {fetchCategories} from "../../store/categories";
import Book from "./Book";
import Category from "./Category";
import classNames from "classnames";

const Home = () => {
  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

  const {
    isFetching, books, currentPage, totalPagesCount,
    isLoggedIn, categories
  } = useSelector(({books, user, categories}) => ({
    isFetching: books.isFetching,
    books: books.books.items,
    currentPage: books.books.page,
    totalPagesCount: books.books.totalPagesCount,
    isLoggedIn: user.user.isLoggedIn,
    categories: categories.categories,
  }));

  const [pagesCount, setPagesCount] = useState(0);
  //init pagination buttons
  const pagesArray = getPagesArray(pagesCount);


  const data = useMemo(() => {
      dispatch(fetchCategories());
      dispatch(fetchBooks(currentPage));
  }, []);


  // const fetch = useCallback(() => {
  //   dispatch(fetchCategories());
  //   dispatch(fetchBooks(currentPage));
  // }, [currentPage]);

  const fetch = () => {
      dispatch(fetchCategories());
      dispatch(fetchBooks(currentPage));
    }


  useEffect(() => {

  }, []);

  // useEffect(() => {
  //   setPagesCount(totalPagesCount);
  //
  // }, [books]);

  return (
    <main className="main">
      <div className="container">
        <h3 className="text-center mt-4">Home page</h3>
        <button
          onClick={() => setCounter(counter + 1)}
        >Click</button>
        <div className="row mt-4">
          <ul className="list-group col-3">
            <li className="list-group-item">Categories:</li>
            {categories && categories.map(category =>
              <Category key={category.id} {...category}/>
            )}
          </ul>

          <div className="books col-9 ml-auto">
            {isFetching
              ?
              <p>Loading...</p>
              :
              <>
                {books && books.map(book => (<Book key={book.id} {...book}/>))}

                <ul className="pagination pagination">
                  {pagesArray && pagesArray.map((page, index) => (
                    <li
                      className={classNames({
                        "page-item": true,
                        "active": currentPage === page
                      })}
                      key={index}>
                      <button className="page-link"
                              onClick={() => dispatch(fetchBooks(page))}>
                        {page}
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            }
          </div>

        </div>
      </div>
    </main>
  );
};

export default Home;