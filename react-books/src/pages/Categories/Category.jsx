import React, { memo } from "react";
import { Link } from "react-router-dom";

const Category = ({ name, books_count, slug }) => {
  return (
    <li>
      <Link to={"/categories/" + slug}>
        <div>
          {name} ({books_count})
        </div>
      </Link>
    </li>
  );
};

export default memo(Category);
