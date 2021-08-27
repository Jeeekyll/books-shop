import React, {useEffect} from "react";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategory} from "../../store/reducers/categories";
import Book from "../Home/Book";
import Sidebar from "../../components/Sidebar";
import BooksPreloader from "../../components/preloaders/BooksPreloader";


const CategorySingle = () => {
  const {slug} = useParams();
  const dispatch = useDispatch();

  const {category, isLoading, categories, isCurrentLoading} = useSelector(({categories}) => ({
    isLoading: categories.isLoading,
    isCurrentLoading: categories.isCurrentLoading,
    category: categories.currentCategory,
    categories: categories.categories,
  }));

  const {name, books} = category;

  useEffect(() => {
    dispatch(fetchCategory(slug));
  }, [slug]);

  return (
    <section className="category-single">
      <div className="container">
        <h3 className="text-center mt-4">Category {name}</h3>
        <div className="row mt-4">

          <Sidebar
            categories={categories}
            isFetching={isLoading}
          />

          {isCurrentLoading
            ?
            <BooksPreloader/>
            :
            <div className="books col-9 ml-auto">
              {books && books.map(book => (<Book key={book.id} {...book}/>))}
            </div>
          }


        </div>
      </div>
    </section>
  );
}

export default CategorySingle;