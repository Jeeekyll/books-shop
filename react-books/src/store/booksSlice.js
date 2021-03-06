import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { booksAPI } from "../api/books";
import {
  createUserBook,
  removeUserBook,
  setBookImage,
  updateUserBook,
} from "./authUserSlice";

// const bookToFormData = (data) => {
//   let formData = new FormData();
//   formData.append("title", data.title);
//   formData.append("user_id", data.user_id);
//   formData.append("description", data.description);
//   formData.append("pages", data.pages);
//   formData.append("rating", data.rating);
//   data.tags.forEach((item) => {
//     data.append(`tags[]`, JSON.stringify(item));
//   });
//
//   formData.append("category_id", data.category_id);
//   formData.append("image", data.image[0]);
//   return formData;
// };

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const { page, sortingParam } = params;
      const response = await booksAPI.getBooks(page, sortingParam);
      dispatch(
        setBooks({
          books: response.data,
          pagination: {
            booksPerPageCount: response.meta?.per_page,
            booksCount: response.meta?.total,
            page: response.meta?.current_page,
          },
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBook = createAsyncThunk(
  "books/fetchBook",
  async (slug, { dispatch, rejectWithValue }) => {
    try {
      const response = await booksAPI.getBook(slug);
      dispatch(setBook(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCreateBook = createAsyncThunk(
  "books/fetchCreateBook",
  async (data, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      const response = await booksAPI.createBook(data, token);
      dispatch(createBook(response.data));
      dispatch(createUserBook(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchRemoveBook = createAsyncThunk(
  "books/fetchRemoveBook",
  async (id, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    try {
      await booksAPI.deleteBook(id, token);
      dispatch(removeBook(id));
      dispatch(removeUserBook(id));
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchUpdateBook = createAsyncThunk(
  "books/fetchUpdateBook",
  async (params, { dispatch, rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const { id, data } = params;
    try {
      const response = await booksAPI.updateBook(id, data, token);
      dispatch(updateBook(response.data));
      dispatch(updateUserBook(response.data));
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const fetchBookImage = createAsyncThunk(
  "books/fetchBookImage",
  async (params, { dispatch, rejectWithValue }) => {
    const { id, file } = params;
    const token = localStorage.getItem("token");
    let formData = new FormData();
    formData.append("image", file.file);
    try {
      const response = await booksAPI.updateBookImage(id, formData, token);
      dispatch(
        setBookImage({
          id: id,
          image: response.image,
        })
      );
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

//helper actions
const setIsLoading = (state, action) => {
  state.isLoading = true;
  state.isSuccess = false;
  state.error = "";
};
const setError = (state, action) => {
  state.isLoading = false;
  state.isSuccess = false;
  state.error = action.payload;
};
const setIsSuccess = (state) => {
  state.isLoading = false;
  state.isSuccess = false;
};

const booksSlice = createSlice({
  name: "books",

  initialState: {
    books: [],
    error: null,
    isLoading: false,
    isSuccess: false,
    pagination: {
      booksPerPageCount: null,
      booksCount: null,
      page: null,
    },
    sortingParam: "date",
    currentBook: {
      error: null,
      isLoading: false,
    },
  },

  reducers: {
    setBooks(state, action) {
      state.books = action.payload.books;
      state.pagination = action.payload.pagination;
    },
    setBook(state, action) {
      state.currentBook = action.payload;
    },
    createBook(state, action) {
      state.books.push(action.payload);
      state.isSuccess = true;
    },
    removeBook(state, action) {
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    updateBook(state, action) {
      const bookIndex = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      state.books[bookIndex] = action.payload;
      state.isSuccess = true;
    },
    setSortingParam(state, action) {
      state.sortingParam = action.payload;
    },
  },

  extraReducers: {
    [fetchBooks.pending]: setIsLoading,
    [fetchBooks.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [fetchBooks.rejected]: setError,

    [fetchBook.pending]: (state) => {
      state.currentBook.isLoading = true;
      state.currentBook.error = "";
    },
    [fetchBook.fulfilled]: (state) => {
      state.currentBook.isLoading = false;
    },
    [fetchBook.rejected]: (state, action) => {
      state.currentBook.isLoading = false;
      state.currentBook.error = action.payload;
    },

    [fetchCreateBook.pending]: setIsLoading,
    [fetchCreateBook.fulfilled]: setIsSuccess,
    [fetchCreateBook.rejected]: setError,

    [fetchRemoveBook.pending]: setIsLoading,
    [fetchRemoveBook.fulfilled]: setIsSuccess,
    [fetchRemoveBook.rejected]: setError,

    [fetchUpdateBook.pending]: setIsLoading,
    [fetchUpdateBook.fulfilled]: setIsSuccess,
    [fetchUpdateBook.rejected]: setError,
  },
});

const { setBooks, setBook, createBook, removeBook, updateBook } =
  booksSlice.actions;
export const { setSortingParam } = booksSlice.actions;

export default booksSlice.reducer;
