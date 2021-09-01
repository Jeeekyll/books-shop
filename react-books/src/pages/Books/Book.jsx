import React, { memo } from "react";
import { Link } from "react-router-dom";

const Book = ({ title, description, slug, pages, rating, image }) => {
  return (
    <article>
      <div>
        <h5>{title}</h5>
        <p>{description.slice(0, 200) + "..."}</p>
        {image && <img src={image} alt="image" className="img-circle" />}
        <div>
          Pages: {pages} | rating: {rating}{" "}
        </div>
        <Link to={"/books/" + slug}>Read more</Link>
      </div>
      <hr />
    </article>
  );
};

export default memo(Book);
