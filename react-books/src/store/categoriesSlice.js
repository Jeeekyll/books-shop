import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { categoriesAPI } from "../api/categories";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoriesAPI.getCategories();
      dispatch(setCategories(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCategory = createAsyncThunk(
  "categories/fetchCategory",
  async (params, { dispatch, rejectWithValue }) => {
    const { slug, page } = params;
    if (!slug) throw new Error("Invalid slug");

    try {
      const response = await categoriesAPI.getCategory(slug, page);
      dispatch(
        setCategory({
          books: response.books.data,
          pagination: {
            booksPerPageCount: response.books.per_page,
            booksCount: response.books.total,
            page: response.books.current_page,
          },
          ...response.category,
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//helper actions
const setIsLoading = (state) => {
  state.isLoading = true;
  state.error = "";
};
const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const categoriesSlice = createSlice({
  name: "categories",

  initialState: {
    isLoading: false,
    error: null,
    categories: [],
    currentCategory: {
      isLoading: false,
      error: null,
      pagination: {
        booksPerPageCount: null,
        booksCount: null,
        page: null,
      },
    },
  },

  reducers: {
    setCategories(state, action) {
      state.categories = action.payload;
    },
    setCategory(state, action) {
      state.currentCategory = action.payload;
      state.currentCategory.pagination = action.payload.pagination;
    },
  },

  extraReducers: {
    [fetchCategories.pending]: setIsLoading,
    [fetchCategories.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [fetchCategories.rejected]: setError,

    [fetchCategory.pending]: (state) => {
      state.currentCategory.isLoading = true;
    },
    [fetchCategory.fulfilled]: (state) => {
      state.currentCategory.isLoading = false;
    },
    [fetchCategory.rejected]: (state, action) => {
      state.currentCategory.isLoading = false;
      state.currentCategory.error = action.payload;
    },
  },
});

const { setCategories, setCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;
