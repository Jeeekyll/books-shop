import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPagesArray} from "../../utils/pages";
import Book from "./Book";
import classNames from "classnames";
import BooksPreloader from "../../components/preloaders/BooksPreloader";
import Sidebar from "../../components/Sidebar";
import {fetchBooks} from "../../store/booksSlice";

const Home = () => {
  const dispatch = useDispatch();

  const {
    books, isBooksLoading, currentPage,
    totalPagesCount, categories, isCategoriesLoading
  } = useSelector(({books, categories}) => ({
    books: books.books,
    currentPage: books.pagination?.page,
    totalPagesCount: books.pagination?.totalPagesCount,
    isBooksLoading: books.isLoading,

    categories: categories.categories,
    isCategoriesLoading: categories.isLoading,

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
        <h3 className="text-center mt-4">Our books</h3>
        <div className="row mt-4">

          <Sidebar
            categories={categories}
            isFetching={isCategoriesLoading}
          />

          <div className="books col-9 ml-auto">
            {isBooksLoading
              ?
              Array(3).fill(0).map((loader, index) =>
                <BooksPreloader key={index}/>)
              :
              <>
                {!!Object.keys(books).length && books.map(book => (<Book key={book.id} {...book}/>))}

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