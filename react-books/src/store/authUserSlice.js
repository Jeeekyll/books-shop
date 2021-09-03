import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userAPI } from "../api/user";

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

    createUserBook(state, action) {
      state.user.books.push(action.payload);
    },
    removeUserBook(state, action) {
      state.user.books = state.user.books.filter(
        (book) => book.id !== action.payload
      );
    },
    updateUserBook(state, action) {
      const bookIndex = state.user.books.findIndex(
        (book) => book.id === action.payload.id
      );
      state.user.books[bookIndex] = action.payload;
    },
    setBookImage(state, action) {
      const bookIndex = state.user.books.findIndex(
        (book) => book.id === action.payload.id
      );
      state.user.books[bookIndex].image = action.payload.image;
    },
  },

  extraReducers: {
    [fetchAuthUser.pending]: setIsLoading,
    [fetchAuthUser.fulfilled]: setIsSuccess,
    [fetchAuthUser.rejected]: setError,
  },
});

const { setAuthUser } = authUserSlice.actions;
export const { createUserBook, removeUserBook, updateUserBook, setBookImage } =
  authUserSlice.actions;
export default authUserSlice.reducer;
