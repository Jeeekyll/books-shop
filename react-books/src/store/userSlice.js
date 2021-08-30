import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userAPI } from "../api/user";

//user thunks
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (token, { dispatch, rejectWithValue }) => {
    if (!token) {
      throw new Error("Logged out");
    }

    try {
      const response = await userAPI.getUser(token);
      dispatch(setUser(response));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      await userAPI.logout(token);
      dispatch(removeUser());
      localStorage.removeItem("token");
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await userAPI.login(data);
      dispatch(setUser(response.user));
      localStorage.setItem("token", response.token);
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await userAPI.register(data);
      dispatch(setUser(response.user));
      localStorage.setItem("token", response.token);
    } catch (error) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

//helper actions
const setIsLoading = (state, action) => {
  state.isLoading = true;
  state.error = "";
};
const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const setIsLoggedIn = (state, action) => {
  state.isLoading = false;
  state.isLoggedIn = true;
};

const userSlice = createSlice({
  name: "user",

  initialState: {
    isLoading: false,
    error: false,
    isLoggedIn: false,
    user: {},
  },

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    removeUser(state) {
      state.user = {};
      state.isLoggedIn = false;
    },
  },

  extraReducers: {
    [fetchUser.pending]: setIsLoading,
    [fetchUser.fulfilled]: setIsLoggedIn,
    [fetchUser.rejected]: setError,

    [logout.pending]: setIsLoading,
    [logout.fulfilled]: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
    },
    [logout.rejected]: setError,

    [login.pending]: setIsLoading,
    [login.fulfilled]: setIsLoggedIn,
    [login.rejected]: setError,

    [register.pending]: setIsLoading,
    [register.fulfilled]: setIsLoggedIn,
    [register.rejected]: setError,
  },
});

const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
