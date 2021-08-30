import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../api/user";
import { booksAPI } from "../api/books";

export const fetchAuthUser = createAsyncThunk(
  "authUser/fetchAuthUser",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const response = await userAPI.getAuthUser(token);
      dispatch(setAuthUser(response.data));
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
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

const setIsLoading = (state) => {
  state.isLoading = true;
  state.error = "";
};
const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const setIsSuccess = (state) => {
  state.isLoading = false;
};

const authUserSlice = createSlice({
  name: "authUser",

  initialState: {
    isLoading: false,
    error: null,
    user: {
      books: [],
    },
  },

  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    createBook(state, action) {
      state.user.books.push(action.payload);
    },
    removeBook(state, action) {
      state.user.books = state.user.books.filter(
        (book) => book.id !== action.payload
      );
    },
  },

  extraReducers: {
    [fetchAuthUser.pending]: setIsLoading,
    [fetchAuthUser.fulfilled]: setIsSuccess,
    [fetchAuthUser.rejected]: setError,

    [fetchCreateBook.pending]: setIsLoading,
    [fetchCreateBook.fulfilled]: setIsSuccess,
    [fetchCreateBook.rejected]: setError,

    [fetchRemoveBook.pending]: setIsLoading,
    [fetchRemoveBook.fulfilled]: setIsSuccess,
    [fetchRemoveBook.rejected]: setError,
  },
});

const { setAuthUser, createBook, removeBook } = authUserSlice.actions;
export default authUserSlice.reducer;
