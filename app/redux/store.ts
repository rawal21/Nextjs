import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice"
import { baseApi } from "../services/baseQuary";
import { postApi } from "../services/postapi";
import { PostbaseApi } from "../services/postbas";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: postReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    [PostbaseApi.reducerPath]: PostbaseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware, PostbaseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
