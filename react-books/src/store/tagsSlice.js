import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tagsAPI } from "../api/tags";

export const fetchTags = createAsyncThunk(
  "tags/fetchTags",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await tagsAPI.getTags();
      dispatch(setTags(response));
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    setTags(state, action) {
      state.tags = action.payload;
    },
  },

  extraReducers: {
    [fetchTags.pending]: (state) => {
      state.isLoading = true;
      state.error = "";
    },
    [fetchTags.fulfilled]: (state) => {
      state.isLoading = false;
    },
    [fetchTags.rejected]: (state, action) => {
      state.isLoading = true;
      state.error = action.payload;
    },
  },
});

const { setTags } = tagsSlice.actions;
export default tagsSlice.reducer;
