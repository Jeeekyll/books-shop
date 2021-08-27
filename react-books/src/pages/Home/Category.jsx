import React from "react";
import {Link} from "react-router-dom";

const Category = ({name, books_count, slug}) => {
  return (
    <li className="list-group-item">
        <Link to={"/categories/" + slug}>
          {name} ({books_count})
        </Link>
    </li>
  );
}

export default Category;