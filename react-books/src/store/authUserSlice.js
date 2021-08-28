import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {userAPI} from "../api/user";

export const fetchAuthUser = createAsyncThunk(
  'authUser/fetchAuthUser',
  async (_, {dispatch, rejectWithValue}) => {
    try {
      const token = localStorage.getItem('token');
      const response = await userAPI.getAuthUser(token);
      dispatch(setAuthUser(response.data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authUserSlice = createSlice({
  name: 'authUser',

  initialState: {
    isLoading: false,
    error: null,
    user: {},
  },

  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
    }
  },

  extraReducers: {
    [fetchAuthUser.pending]: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    [fetchAuthUser.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [fetchAuthUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    }
  },
});

const {setAuthUser} = authUserSlice.actions;
export default authUserSlice.reducer;