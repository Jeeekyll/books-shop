import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Book from "../../Books/Book";
import Sidebar from "../../../components/Sidebar";
import BooksPreloader from "../../../components/preloaders/BooksPreloader";
import { fetchCategory } from "../../../store/categoriesSlice";
import cn from "classnames";
import { getPagesArray } from "../../../utils/pages";

const CategorySingle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { category, categories, isLoading, isLoadingCurrent, booksPagination } =
    useSelector(({ categories }) => ({
      isLoading: categories.isLoading,
      categories: categories.categories,

      isLoadingCurrent: categories.currentCategory.isLoading,
      category: categories.currentCategory,
      booksPagination: categories.currentCategory.pagination,
    }));

  const { name, books } = category;

  const pagesCount = booksPagination.totalPagesCount;
  const pagesArray = getPagesArray(pagesCount);
  const currentPage = booksPagination.page;

  useEffect(() => {
    dispatch(fetchCategory({ slug }));
  }, [slug]);

  return (
    <section className="category-single">
      <div className="container">
        <h3 className="text-center mt-4">Category {name}</h3>
        <div className="row mt-4">
          <Sidebar categories={categories} isFetching={isLoading} />

          <div className="books col-9 ml-auto mt-4">
            {isLoadingCurrent ? (
              <BooksPreloader />
            ) : (
              <>
                {books && books.map((book) => <Book key={book.id} {...book} />)}
                {pagesCount > 1 && (
                  <ul className="pagination pagination">
                    {pagesArray &&
                      pagesArray.map((page, index) => (
                        <li
                          className={cn("page-item", {
                            active: currentPage === page,
                          })}
                          key={index}
                        >
                          <button
                            className="page-link"
                            onClick={() =>
                              dispatch(fetchCategory({ slug, page }))
                            }
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                  </ul>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySingle;
