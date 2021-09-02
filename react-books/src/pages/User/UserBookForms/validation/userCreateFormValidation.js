import * as yup from "yup";

export const createBookSchema = yup.object().shape({
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
    .required("Pages count is required")
    .typeError("Pages count is required")
    .integer()
    .positive()
    .lessThan(3000),
  rating: yup
    .number()
    .required("Rating is required")
    .typeError("Rating is required")
    .min(0)
    .max(5),
});
