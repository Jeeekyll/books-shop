import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchBook} from "../../../store/books";
import {Link} from "react-router-dom";

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

  return (
    <section className="book-single">
      <div className="container p-5">
        {isFetching ?
          <h3 className="text-center mt-4">
            Loading...
          </h3>
          :
          <>
            <h3 className="text-center mt-4">
              {currentBook.title}
            </h3>
            <p className="lead mt-4">
              {currentBook.description}
            </p>
            <h6>
              Pages: {currentBook.pages}
            </h6>
            <h6>
              Category:
              <Link className="ml-1" to={"/categories/" + currentBook?.category?.slug}>
                {currentBook?.category?.name}
              </Link>
            </h6>
            <h6>
              Rating: {currentBook.rating}
            </h6>
            {currentBook?.user &&
            <p>Created {currentBook.created_at} by {currentBook?.user?.name}</p>}

            {currentBook?.tags?.length ?
              <div className="tags">
                <h6>Books tags: </h6>
                {currentBook.tags.map(tag =>
                  <Link to={"/tags/" + tag.slug} className="btn btn-primary mr-2" key={tag.id}>
                    {tag.name}
                  </Link>
                )}
              </div>
              :
              ''
            }
          </>
        }
      </div>
    </section>
  );
}

export default BookSingle;