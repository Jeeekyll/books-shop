import React, { memo, useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Book from "../Books/Book";
import { fetchBooks, setSortingParam } from "../../store/booksSlice";
import { Col, Pagination, Row } from "antd";
import Select from "antd/lib/select";
import Title from "antd/lib/typography/Title";
import Spin from "antd/lib/spin";

const Home = () => {
  const dispatch = useDispatch();

  const { books, isLoading, sortingParam, booksPagination } = useSelector(
    ({ books, categories }) => ({
      books: books.books,
      booksPagination: books.pagination,
      isLoading: books.isLoading,
      sortingParam: books.sortingParam,
    }),
    shallowEqual
  );

  const { page, booksPerPageCount, booksCount } = booksPagination;

  const sortingItems = [
    { id: "pages", text: "Pages (asc)" },
    { id: "-pages", text: "Pages (desc)" },
    { id: "rating", text: "Rating (asc)" },
    { id: "-rating", text: "Rating (desc)" },
    { id: "title", text: "Title (acs)" },
    { id: "-title", text: "Title (desc)" },
  ];

  useEffect(() => {
    dispatch(fetchBooks({ page, sortingParam }));
  }, [dispatch, page, sortingParam]);

  const handleBooksSort = (value) => {
    dispatch(setSortingParam(value));
    dispatch(
      fetchBooks({
        page,
        sortingParam: value,
      })
    );
  };

  return (
    <Row gutter={[0, 20]}>
      <Col span={24}>
        <Row justify="center">
          <Col>
            <Title level={2}>Our books</Title>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        <Row justify="end">
          <Col>
            <Select
              onChange={handleBooksSort}
              defaultValue={"Sort by: "}
              style={{ minWidth: "140px" }}
            >
              {sortingItems &&
                sortingItems.map((item) => (
                  <Select.Option value={item.id} key={item.id}>
                    {item.text}
                  </Select.Option>
                ))}
            </Select>
          </Col>
        </Row>
      </Col>

      <Col span={24}>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Row gutter={[24, 24]}>
            {!!Object.keys(books).length &&
              books.map((book) => <Book key={book.id} {...book} />)}
          </Row>
        )}
      </Col>

      <Col span={24}>
        {!isLoading && (
          <Pagination
            defaultCurrent={1}
            total={booksCount}
            pageSize={booksPerPageCount}
            current={page}
            onChange={(page) => {
              dispatch(fetchBooks({ page, sortingParam }));
            }}
          />
        )}
      </Col>
    </Row>
  );
};

export default memo(Home);
