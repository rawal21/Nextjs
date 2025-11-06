import { configureStore  } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"
import postReducer from "./slices/postSlice."
import SinglepostReducer from "./slices/SinglePostSlice"
export  const store = configureStore({
    reducer : {
        auth :  authReducer,
        post : postReducer,
        singlePost : SinglepostReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type  AppDispatch = typeof store.dispatch;