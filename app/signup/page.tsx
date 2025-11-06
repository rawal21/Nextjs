/* eslint-disable @next/next/no-img-element */
"use client";
import axios from "axios";
import { useState } from "react";
import {  useRouter } from "next/navigation";
import { useAppDispatch , useAppSelector } from "../redux/hooks";
import { signupUser } from "../redux/slices/authSlice";
export default function ProfileCard() {
  const router  = useRouter();
  const disaptch = useAppDispatch();
  const {loading , error } = useAppSelector((state)=>  state.auth);
  const [formData, setFormData] = useState({ name : "", email: "", password: "" });


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
  

    // 🔹 Validate before sending
    if (!formData.email || !formData.password) {
      console.log("Please enter both email and password.");
      return;
    } 

    const  result = await disaptch(signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
    }));

     if (signupUser.fulfilled.match(result)) {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-50 px-4">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="font-bold text-3xl text-gray-800">Welcome Back 👋</h2>
        <p className="font-medium text-gray-500 mt-2">Sign in to your account</p>
      </div>

      {/* Card */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col overflow-y-hidden justify-center gap-4 shadow-lg p-8 w-full max-w-sm bg-white rounded-2xl border border-gray-100"
      >
        {error && (
          <p className="text-red-600 text-sm font-medium text-center">{error}</p>
        )}

           <input
          name="name"
          type="text"
          placeholder="Enter your name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-700 placeholder-gray-400"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <input
          name="email"
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-700 placeholder-gray-400"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <input
          name="password"
          type="password"
          placeholder="Enter your password"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 text-base focus:outline-none focus:ring-2 focus:ring-gray-700 placeholder-gray-400"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full rounded-lg text-lg font-semibold text-white py-2 transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          {loading ? "Logging in..." : "Signup"}
        </button>

        <p className="text-sm text-gray-500 mt-2 text-center">
          Forgot your password?{" "}
          <span className="text-gray-700 font-medium hover:underline cursor-pointer">
            Reset here
          </span>
        </p>
      </form>

      {/* Signup link */}
      <p className="text-center font-medium text-gray-600 mt-6">
         have an account?{" "}
        <span onClick={()=> router.push("/login")} className="cursor-pointer font-semibold text-gray-800 hover:underline">
          login
        </span>
      </p>
    </div>
  );
}
