import React, {memo} from "react";
import {Link, useParams} from "react-router-dom";
import cn from "classnames";

const Category = ({name, books_count, slug}) => {
  const {slug: pageSlug} = useParams();
  const isActive = slug === pageSlug ? 'active' : false;

  return (
    <li className={cn('list-group-item', {'active': isActive})}>
      <Link to={"/categories/" + slug} className={cn({'text-white': isActive})}>
        <div>{name} ({books_count})</div>
      </Link>
    </li>
  );
}

export default memo(Category);