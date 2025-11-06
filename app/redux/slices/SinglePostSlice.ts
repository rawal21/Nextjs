import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  title: string;
  content: string;
}

interface postState {
  post: Post | null;
  loading: boolean | null;
  error: string | null;
}

const initialState: postState = {
  post:  null,
  loading: false,
  error: null,
};

// Fetch single post by slug
export const fetchBySingle = createAsyncThunk(
  "post/fetchSingle",
  async (slug: string, { rejectWithValue }) => {
    try {
         const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/posts/${slug}`,{
        headers : {
            Authorization : `Bearer ${token}`
        }
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch post"
      );
    }
  }
);

const SinglepostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
     //fetch single post
    builder
      .addCase(fetchBySingle.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBySingle.fulfilled, (state, action) => {
        state.loading = false;
        state.post = action.payload;
      })
      .addCase(fetchBySingle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default SinglepostSlice.reducer ;
