import React, { memo } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BackendErrors from "../../../components/BackendErrors";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchCreateBook } from "../../../store/booksSlice";

const createBookSchema = yup.object().shape({
  title: yup
    .string("Enter book title")
    .required("Title is required")
    .max(250, "Enter shorter title")
    .min(3, "Title should be of minimum 3 characters length"),
  description: yup
    .string("Enter book description")
    .required("Description is required")
    .min(3, "Description should be of minimum 3 characters length"),
  pages: yup
    .number()
    .typeError("Pages count is required")
    .integer()
    .positive()
    .lessThan(3000),
  rating: yup.number().typeError("Rating is required").min(0).max(5),
});

const UserCreateBook = ({ show, setShow, tags }) => {
  const dispatch = useDispatch();

  const { userId, categories, isLoading } = useSelector(
    ({ user, categories, books }) => ({
      categories: categories.categories,
      userId: user.user.id,
      isLoading: books.isLoading,
    }),
    shallowEqual
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createBookSchema),
  });

  const onSubmit = (data) => {
    data.user_id = userId;
    dispatch(fetchCreateBook(data));
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Add book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/*{error && <BackendErrors errors={error}/>}*/}

          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              id="title"
              className="form-control form-control"
            />
            {errors.title && (
              <label className="form-label text-danger" htmlFor="title">
                *{errors.title.message}
              </label>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="description">
              Description
            </label>
            <textarea
              {...register("description")}
              id="description"
              className="form-control"
            ></textarea>
            {errors.description && (
              <label className="form-label text-danger" htmlFor="description">
                *{errors.description.message}
              </label>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="pages">
              Pages count
            </label>
            <input
              {...register("pages")}
              type="number"
              id="pages"
              className="form-control form-control"
            />
            {errors.pages && (
              <label className="form-label text-danger" htmlFor="pages">
                *{errors.pages.message}
              </label>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="title">
              Rating
            </label>
            <input
              {...register("rating")}
              type="number"
              id="rating"
              className="form-control form-control"
            />
            {errors.rating && (
              <label className="form-label text-danger" htmlFor="pages">
                *{errors.rating.message}
              </label>
            )}
          </div>

          <div className="form-group">
            <label className="form-label text-muted" htmlFor="category">
              Category
            </label>
            <select
              className="form-control"
              id="category"
              {...register("category_id")}
            >
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label text-muted" htmlFor="category">
              Select tags
            </label>
            <select
              multiple={tags}
              className="form-control"
              id="category"
              {...register("tags")}
            >
              {tags &&
                tags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.name}
                  </option>
                ))}
            </select>
          </div>

          <button
            className="btn btn-primary mt-4"
            type="submit"
            disabled={isLoading}
          >
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default memo(UserCreateBook);
