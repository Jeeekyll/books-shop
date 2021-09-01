import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Book from "../../Books/Book";
import { fetchCategory } from "../../../store/categoriesSlice";
import cn from "classnames";
import { getPagesArray } from "../../../utils/pages";
import { Col, Row, Spin } from "antd";
import Title from "antd/lib/typography/Title";

const CategorySingle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { category, isLoading, booksPagination } = useSelector(
    ({ categories }) => ({
      isLoading: categories.currentCategory.isLoading,
      category: categories.currentCategory,
      booksPagination: categories.currentCategory.pagination,
    })
  );
  const { name, books } = category;

  const pagesCount = booksPagination.totalPagesCount;
  const pagesArray = getPagesArray(pagesCount);
  const currentPage = booksPagination.page;

  useEffect(() => {
    dispatch(fetchCategory({ slug }));
  }, [slug]);

  return (
    <section className="category-single">
      <Row>
        {isLoading ? (
          <Col span={24} offset={12}>
            <Spin size="large" />
          </Col>
        ) : (
          <>
            <Col span={12} offset={6}>
              <Title level={2} className="text-center">
                Category {name}
              </Title>
            </Col>
            <Col span={24} className="mt-4">
              <Row gutter={[40, 40]}>
                {books && books.map((book) => <Book key={book.id} {...book} />)}
              </Row>

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
            </Col>
          </>
        )}
      </Row>
    </section>
  );
};

export default CategorySingle;
