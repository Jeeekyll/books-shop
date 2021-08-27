import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchBook} from "../../../store/reducers/books";
import {Link} from "react-router-dom";
import BooksPreloader from "../../../components/preloaders/BooksPreloader";

const BookSingle = () => {
  const {slug} = useParams();
  const dispatch = useDispatch();

  const {currentBook, isFetching} = useSelector(({books}) => ({
    currentBook: books.currentBook,
    isFetching: books.isFetching,
  }));

  useEffect(() => {
    dispatch(fetchBook(slug));
  }, []);

  const {
    title, description, pages, rating,
    created_at, category, user, tags
  } = currentBook;

  return (
    <section className="book-single">
      <div className="container">
        <div className="row pt-4">
          {isFetching ?
            <BooksPreloader className="m-auto col-8"/>
            :
            <div className="book-single col-8 m-auto">
              <h3 className="text-center">
                {title}
              </h3>
              <p className="lead mt-4">
                {description}
              </p>
              <h6>
                Pages: {pages}
              </h6>
              <h6>
                Category:
                <Link className="ml-1" to={"/categories/" + category?.slug}>
                  {category?.name}
                </Link>
              </h6>
              <h6>
                Rating: {rating}
              </h6>
              {currentBook?.user &&
              <p>Created {created_at} by {user?.nickname}</p>}

              {currentBook?.tags?.length ?
                <div className="tags">
                  <h6>Books tags: </h6>
                  {tags && tags.map(tag =>
                    <Link to={"/tags/" + tag.slug} className="btn btn-primary mr-2" key={tag.id}>
                      {tag.name}
                    </Link>
                  )}
                </div>
                :
                ''
              }
            </div>
          }
        </div>
      </div>
    </section>
  );
}

export default BookSingle;