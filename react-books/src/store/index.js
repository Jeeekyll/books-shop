import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import categoriesSlice from "./categoriesSlice";
import booksSlice from "./booksSlice";
import authUserSlice from "./authUserSlice";
import tagsSlice from "./tagsSlice";

export default configureStore({
  reducer: {
    user: userSlice,
    categories: categoriesSlice,
    books: booksSlice,
    authUser: authUserSlice,
    tags: tagsSlice,
  },
});
