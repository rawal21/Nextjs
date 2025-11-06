"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { createPost } from "../redux/slices/postSlice.";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { title } from "process";

export default function PostForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: "", content: "" });
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.post);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await dispatch(
      createPost({ title: formData.title, content: formData.content })
    );

    if (createPost.fulfilled.match(res)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-start w-screen justify-center p-12">
      <div className="flex flex-col items-start p-2">
        <p
          onClick={() => router.push("/dashboard")}
          className="text-semibold text-lg text-gray-600 hover:underline cursor-pointer"
        >
          back to dashboard
        </p>
        <h2 className="font-bold text-4xl">Create New Post</h2>
      </div>

      {/* Post Form */}
      <div className="flex flex-col w-full items-center p-2">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md space-y-6"
        >
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-gray-700 font-medium">
              Title
            </label>
            <input
              name="title"
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              placeholder="Enter your title"
              className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg p-3 text-gray-800 placeholder-gray-400 transition"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label
              htmlFor="content"
              className="block text-gray-700 font-medium"
            >
              Content
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="What's in your mind..."
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-100 rounded-lg p-3 text-gray-800 placeholder-gray-400 transition"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-row items-center gap-5">
            <button
              type="submit"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg py-3 transition-all duration-300"
            >
              Publish Post
            </button>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg py-3 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
