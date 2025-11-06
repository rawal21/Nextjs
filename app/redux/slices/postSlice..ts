import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  title: string;
  content: string;
}

interface postState {
  posts: Post[];
  loading: boolean | null;
  error: string | null;
}

const initialState: postState = {
  posts: [],
  loading: false,
  error: null,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (
    { title, content }: { title: string; content: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:3000/posts",
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "faild to create Post"
      );
    }
  }
);

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "post/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
        const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:3000/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("res data in redux postslice" , res.data);
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error?.response?.data?.message || "Failed to fetch posts"
      );
    }
  }
);


const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // createPost
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // fetchAllPost
      .addCase(fetchPosts.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

   
  },
});

export default postSlice.reducer;
