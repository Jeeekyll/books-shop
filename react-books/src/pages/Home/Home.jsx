import React, {useEffect, useState} from "react";
import {fetchBooks} from "../../store/reducers/books";
import {useDispatch, useSelector} from "react-redux";
import {getPagesArray} from "../../utils/pages";
import Book from "./Book";
import classNames from "classnames";
import BooksPreloader from "../../components/preloaders/BooksPreloader";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  const dispatch = useDispatch();

  const {
    isBooksFetching, books, currentPage, totalPagesCount, categories, isCategoriesFetching
  } = useSelector(({books, categories}) => ({
    books: books.books,
    currentPage: books.pagination.page,
    totalPagesCount: books.pagination.totalPagesCount,
    isBooksFetching: books.isFetching,

    categories: categories.categories,
    isCategoriesFetching: categories.isLoading
  }));

  //init pagination buttons
  const [pagesCount, setPagesCount] = useState(totalPagesCount);
  const pagesArray = getPagesArray(pagesCount);

  useEffect(() => {
    if (!books.length) dispatch(fetchBooks(currentPage));
    setPagesCount(totalPagesCount);
  }, [totalPagesCount]);

  return (
    <main className="main">
      <div className="container">
        <h3 className="text-center mt-4">Home page</h3>
        <div className="row mt-4">

          <Sidebar
            categories={categories}
            isFetching={isCategoriesFetching}
          />

          <div className="books col-9 ml-auto">
            {isBooksFetching
              ?
              Array(3).fill(0).map((loader, index) =>
                <BooksPreloader key={index}/>)
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