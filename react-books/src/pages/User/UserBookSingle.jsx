import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserDeleteBook from "./UserBookForms/UserDeleteBook";
import UserUpdateBook from "./UserBookForms/UserUpdateBook";

const UserBookSingle = ({
  id,
  title,
  slug,
  description,
  category_id,
  pages,
  rating,
  tags,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const currentBookObject = {
    id,
    title,
    description,
    category_id,
    pages,
    rating,
    tags,
  };

  return (
    <li className="list-group-item d-flex justify-content-between">
      <Link to={"/books/" + slug}>{title}</Link>
      <div className="actions">
        <button
          className="btn btn-danger btn-sm mr-2"
          onClick={() => setShowDeleteModal(true)}
        >
          Delete
        </button>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowUpdateModal(true)}
        >
          Edit
        </button>
      </div>

      <UserDeleteBook
        show={showDeleteModal}
        setShow={setShowDeleteModal}
        id={id}
      />

      <UserUpdateBook
        show={showUpdateModal}
        setShow={setShowUpdateModal}
        {...currentBookObject}
      />
    </li>
  );
};

export default UserBookSingle;
