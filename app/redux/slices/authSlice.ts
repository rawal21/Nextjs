import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = {
  accessToken: typeof window !== "undefined" ? localStorage.getItem("token") : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<{ accessToken: string }>) => {
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("token", action.payload.accessToken);
    },

    logout: (state) => {
      state.accessToken = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
