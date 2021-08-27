import {useEffect} from "react";
import {fetchCategories} from "../store/reducers/categories";
import {useDispatch, useSelector} from "react-redux";

const RootContainer = ({children}) => {
  const dispatch = useDispatch();
  const {categories} = useSelector(({categories}) => ({categories: categories.categories}));

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, []);

  return children;
}

export default RootContainer;
