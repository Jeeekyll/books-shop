import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getPagesArray } from "../../utils/pages";
import Book from "../Books/Book";
import classNames from "classnames";
import BooksPreloader from "../../components/preloaders/BooksPreloader";
import Sidebar from "../../components/Sidebar";
import { fetchBooks, setSortingParam } from "../../store/booksSlice";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();

  const {
    books,
    isBooksLoading,
    currentPage,
    totalPagesCount,
    categories,
    isCategoriesLoading,
    sortingParam,
  } = useSelector(
    ({ books, categories }) => ({
      books: books.books,
      currentPage: books.pagination?.page,
      totalPagesCount: books.pagination?.totalPagesCount,
      isBooksLoading: books.isLoading,
      sortingParam: books.sortingParam,

      categories: categories.categories,
      isCategoriesLoading: categories.isLoading,
    }),
    shallowEqual
  );

  const sortingItems = [
    { id: "pages", text: "Pages (asc)" },
    { id: "-pages", text: "Pages (desc)" },
    { id: "rating", text: "Rating (asc)" },
    { id: "-rating", text: "Rating (desc)" },
    { id: "title", text: "Title (acs)" },
    { id: "-title", text: "Title (desc)" },
  ];

  //init pagination buttons
  const [pagesCount, setPagesCount] = useState(totalPagesCount);
  const pagesArray = getPagesArray(pagesCount);

  useEffect(() => {
    if (!books.length) {
      dispatch(fetchBooks({ currentPage, sortingParam }));
    }
    setPagesCount(totalPagesCount);
  }, [totalPagesCount]);

  const handleBooksSort = (e) => {
    const sortingOption = e.target.value;
    dispatch(setSortingParam(sortingOption));
    dispatch(
      fetchBooks({
        currentPage,
        sortingParam: sortingOption,
      })
    );
  };

  return (
    <main className="main pt-4 pb-4">
      <div className="container">
        <h3 className="text-center mt-2">Our books</h3>
        <div className="row">
          <Sidebar categories={categories} isFetching={isCategoriesLoading} />

          <div className="books col-9 ml-auto">
            <div className="col-3 ml-auto">
              <select
                id="inputState"
                className="form-control"
                onChange={handleBooksSort}
              >
                {sortingItems &&
                  sortingItems.map((item) => (
                    <option
                      defaultValue={item.id === sortingParam}
                      className={classNames({
                        active: item.id === sortingParam,
                      })}
                      value={item.id}
                      key={item.id}
                    >
                      {" "}
                      {item.text}{" "}
                    </option>
                  ))}
              </select>
            </div>

            {isBooksLoading ? (
              Array(3)
                .fill(0)
                .map((loader, index) => <BooksPreloader key={index} />)
            ) : (
              <>
                {!!Object.keys(books).length &&
                  books.map((book) => <Book key={book.id} {...book} />)}

                <ul className="pagination pagination">
                  {pagesArray &&
                    pagesArray.map((page, index) => (
                      <li
                        className={classNames({
                          "page-item": true,
                          active: currentPage === page,
                        })}
                        key={index}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            dispatch(fetchBooks({ page, sortingParam }))
                          }
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default memo(Home);
