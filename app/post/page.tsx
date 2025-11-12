"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreatePostMutation, useUploadImageMutation } from "../services/postapi";
import { title } from "process";

export default function PostForm() {
  const router = useRouter();
  const [formDatas, setFormData] = useState({ title: "", content: "" });
  const [imagefile, setimagefile] = useState<File | null>(null)
  const [createPost , {isLoading , error}] = useCreatePostMutation();
  const [uploadImage ] = useUploadImageMutation()



    const handleSubmitwithImage = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title" , formDatas.title);
    formData.append("content" , formDatas.content);
    if(imagefile)
    {
      formData.append("image" , imagefile)
    }

    try {
      // Call the mutation and unwrap the response
      const res = await uploadImage(formData).unwrap();
      console.log("res  deubbuing in post form " , res)
 // Success: redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      // Handle error (err contains server error message)
      console.error("Failed to create post:", err);
    }
  };

   const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Call the mutation and unwrap the response
      const res = await createPost({title : formDatas.title , content : formDatas.content}).unwrap();
 // Success: redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      // Handle error (err contains server error message)
      console.error("Failed to create post:", err);
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
          onSubmit={imagefile ? handleSubmitwithImage : handleSubmit}
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
              value={formDatas.title}
              onChange={(e) =>
                setFormData({ ...formDatas, [e.target.name]: e.target.value })
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
              value={formDatas.content}
              onChange={(e) =>
                setFormData({ ...formDatas, [e.target.name]: e.target.value })
              }
              className="w-full border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-100 rounded-lg p-3 text-gray-800 placeholder-gray-400 transition"
            />
          </div>


          {/* File upload */}
          <div className="space-y-2">
            <label
              htmlFor="image"
              className="block text-gray-700 font-medium"
            >
              Image
            </label>
            <input
            type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) =>
                setimagefile(e.target.files?.[0] || null)
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
