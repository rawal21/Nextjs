import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}

interface authState {
  user: User | null;
  access_token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: authState = {
  user: null,
  access_token: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login  failed");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (
    {
      name,
      email,
      password,
    }: { namme: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/signup", {
        name,
        email,
        password,
      });
      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Faild the signup"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.access_token = null;
      localStorage.removeItem("token");
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
        localStorage.setItem("token", action.payload.access_token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.access_token = action.payload.access_token;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout , setCredentials} = authSlice.actions;
export default authSlice.reducer ;