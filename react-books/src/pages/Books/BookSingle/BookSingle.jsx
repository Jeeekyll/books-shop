import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBook } from "../../../store/booksSlice";
import { Col, Empty, Image, Row, Spin, Tag } from "antd";
import Rate from "antd/lib/rate";

const BookSingle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  const { currentBook, isLoading } = useSelector(({ books }) => ({
    currentBook: books.currentBook,
    isLoading: books.currentBook.isLoading,
  }));

  useEffect(() => {
    dispatch(fetchBook(slug));
  }, [slug, dispatch]);

  const {
    title,
    description,
    pages,
    rating,
    created_at,
    category,
    user,
    tags,
    image,
  } = currentBook;

  return (
    <section className="book-single">
      <Row>
        {isLoading ? (
          <Col span={24} offset={12}>
            <Spin size="large" />
          </Col>
        ) : (
          <Col span={12} offset={6}>
            <h3 className="text-center">{title}</h3>
            {image && <Image width={280} src={image} />}
            <p className="lead mt-4">{description}</p>
            <h6>
              Category:
              <Link className="ml-1" to={"/categories/" + category?.slug}>
                {category?.name}
              </Link>
            </h6>
            <h6>
              {pages} <span>pages</span>
            </h6>
            <div className="mb-2">
              Rating: <Rate defaultValue={rating} disabled={true} />
            </div>
            {currentBook?.user && (
              <p>
                Created {created_at} by
                <Link to="/user" className="ml-1">
                  {user?.nickname}
                </Link>
              </p>
            )}
            {currentBook?.tags?.length ? (
              <div className="tags">
                <h6>Book tags: </h6>
                {tags &&
                  tags.map((tag) => (
                    <Tag key={tag.id}>
                      <Link to={"/tags/" + tag.slug}>{tag.name}</Link>
                    </Tag>
                  ))}
              </div>
            ) : (
              <Empty description="No tags" />
            )}
          </Col>
        )}
      </Row>
    </section>
  );
};

export default BookSingle;
