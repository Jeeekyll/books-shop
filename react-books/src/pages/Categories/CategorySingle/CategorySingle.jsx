import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Book from "../../Books/Book";
import { fetchCategory } from "../../../store/categoriesSlice";
import { Col, Pagination, Row, Spin } from "antd";
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
  const { page, booksPerPageCount, booksCount } = booksPagination;

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
              <Row gutter={[24, 24]} justify="center">
                {books && books.map((book) => <Book key={book.id} {...book} />)}
              </Row>
            </Col>
            <Col span={24}>
              {booksCount > booksPerPageCount && !isLoading && (
                <Pagination
                  defaultCurrent={1}
                  total={booksCount}
                  pageSize={booksPerPageCount}
                  current={page}
                  onChange={(page) => {
                    dispatch(fetchCategory({ slug, page }));
                  }}
                />
              )}
            </Col>
          </>
        )}
      </Row>
    </section>
  );
};

export default CategorySingle;
