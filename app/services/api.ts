// src/api/authApi.ts
import { baseApi } from "./baseQuary";
import { User } from "../types/User";

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  name: string;
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  access_token: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    signupUser: builder.mutation<AuthResponse, SignupRequest>({
      query: (credentials) => ({
        url: 'auth/signup',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    userProfile: builder.query<AuthResponse, void>({
      query: () => ({
        url: 'auth/profile',
        method: "GET",
      }),
      providesTags: ['Auth'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginUserMutation,
  useSignupUserMutation,
  useUserProfileQuery,
} = authApi;
