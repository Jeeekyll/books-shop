import React from "react";
import {Link} from "react-router-dom";

const Book = ({title, description, slug}) => {
  return (
    <article>
      <div>
        <h5>{title}</h5>
        <p>{description}</p>
        <Link to={"/books/" + slug}>
          Read more
        </Link>
      </div>
      <hr/>
    </article>
  );
}

export default Book;