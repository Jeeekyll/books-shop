import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {booksAPI} from "../api/books";

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (params, {dispatch, rejectWithValue}) => {
    try {
      const {page, sortingParam} = params;
      const response = await booksAPI.getBooks(page, sortingParam);
      dispatch(setBooks({
        books: response.data,
        pagination: {
          totalPagesCount: response.meta?.last_page,
          page: response.meta?.current_page,
        },
      }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchBook = createAsyncThunk(
  'books/fetchBook',
  async (slug, {dispatch, rejectedWithValue}) => {
    try {
      const response = await booksAPI.getBook(slug);
      dispatch(setBook(response.data));
    } catch (error) {
      return rejectedWithValue(error.message);
    }
  }
);

//helper actions
const setIsLoading = (state, action) => {
  state.isLoading = true;
  state.error = '';
}
const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
}

const booksSlice = createSlice({
  name: 'books',

  initialState: {
    books: [],
    error: null,
    isLoading: false,
    pagination: {},
    sortingParam: 'date',

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
    setSortingParam(state, action) {
      state.sortingParam = action.payload;
    }
  },

  extraReducers: {
    [fetchBooks.pending]: setIsLoading,
    [fetchBooks.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [fetchBooks.rejected]: setError,

    [fetchBook.pending]: (state) => {
      state.currentBook.isLoading = true;
      state.currentBook.error = '';
    },
    [fetchBook.fulfilled]: (state) => {
      state.currentBook.isLoading = false;
    },
    [fetchBook.rejected]: (state, action) => {
      state.currentBook.isLoading = false;
      state.currentBook.error = action.payload;
    },

  }
});

const {setBooks, setBook} = booksSlice.actions;
export const {setSortingParam} = booksSlice.actions;

export default booksSlice.reducer;