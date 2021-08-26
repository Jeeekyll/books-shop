import React, {useEffect, useState} from "react";
import {fetchBooks} from "../../store/books";
import {useDispatch, useSelector} from "react-redux";
import {getPagesArray} from "../../utils/pages";
import {fetchCategories} from "../../store/categories";
import Book from "./Book";
import Category from "./Category";
import classNames from "classnames";

const Home = () => {
  const dispatch = useDispatch();

  const {
    isFetching, books, currentPage, totalPagesCount, categories
  } = useSelector(({books, user, categories}) => ({
    books: books.books,
    currentPage: books.pagination.page,
    totalPagesCount: books.pagination.totalPagesCount,
    isFetching: books.isFetching,

    categories: categories.categories,
  }));

  //init pagination buttons
  const [pagesCount, setPagesCount] = useState(totalPagesCount);
  const pagesArray = getPagesArray(pagesCount);

  useEffect(() => {
    if (!categories.length) dispatch(fetchCategories());
    if (!books.length) dispatch(fetchBooks(currentPage));

    setPagesCount(totalPagesCount);
  }, [totalPagesCount]);

  return (
    <main className="main">
      <div className="container">
        <h3 className="text-center mt-4">Home page</h3>
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