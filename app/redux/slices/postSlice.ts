import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { postApi } from "@/app/services/postapi";
import type { Post } from "@/app/types/post";

interface PostState {
  posts: Post[];
  selectedPost: Post | null;
  loading: boolean;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
  loading: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Pending
      .addMatcher(
        isAnyOf(
          postApi.endpoints.fetchPost.matchPending,
          postApi.endpoints.getPostById.matchPending,
          postApi.endpoints.createPost.matchPending,
          postApi.endpoints.updatePost.matchPending,
          postApi.endpoints.deletePost.matchPending
        ),
        (state) => {
          state.loading = true;
        }
      )

      // Fulfilled
      .addMatcher(
        isAnyOf(
          postApi.endpoints.fetchPost.matchFulfilled,
          postApi.endpoints.getPostById.matchFulfilled,
          postApi.endpoints.createPost.matchFulfilled,
          postApi.endpoints.updatePost.matchFulfilled
        ),
        (state, action) => {
           console.log("debugging the posts in auth slice .." , action.payload);
          if (Array.isArray(action.payload)) {
             
            state.posts = action.payload;
          } else {
            state.selectedPost = action.payload;
          }
          state.loading = false;
        }
      )

      // Delete or error
      .addMatcher(
        isAnyOf(
          postApi.endpoints.deletePost.matchFulfilled,
          postApi.endpoints.deletePost.matchRejected,
          postApi.endpoints.fetchPost.matchRejected,
          postApi.endpoints.createPost.matchRejected,
          postApi.endpoints.updatePost.matchRejected,
          postApi.endpoints.getPostById.matchRejected
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setSelectedPost } = postSlice.actions;
export default postSlice.reducer;
