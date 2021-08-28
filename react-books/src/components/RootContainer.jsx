import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/categoriesSlice";

const RootContainer = ({children}) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, []);

  return children;
}

export default RootContainer;
