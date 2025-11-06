"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchPosts } from "../redux/slices/postSlice.";
import { useAppDispatch , useAppSelector } from "../redux/hooks";

export default function Dashboard() {
  const [storedUser, setStoredUser] = useState(null);
  const router = useRouter();
   const dispatch = useAppDispatch();
   const {error , loading , posts } = useAppSelector((state)=> state.post);
   
   console.log("trying to fetch post usiing redux " , posts)

  const fetchPost = async () => {
     dispatch(fetchPosts());
  };

  useEffect(() => {
    fetchPost(); // ✅ run once
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setStoredUser(parsedUser);
      console.log(parsedUser);
    }
  }, []);

  return (
    <div className="flex flex-col p-5 w-screen items-center justify-center">
      {/* header part */}
      <div className="flex flex-row p-3 w-full items-center justify-between">
        <div>
          <h3 className="text-center text-2xl font-bold">Dashboard</h3>
          <p className="text-center text-ms font-semibold text-gray-500">
            Welcome, {storedUser ? storedUser.name : "User"}
          </p>
        </div>
        <button
          onClick={() => router.push("/post")}
          className="bg-gray-800 text-lg rounded-lg text-white py-2 p-3 hover:bg-gray-700"
        >
          Add Post
        </button>
      </div>

      <div>
        {posts?.length > 0 ? (
          <div className="flex flex-col w-screen items-center  p-10">
            {posts.map((post) => (
              <div
                className=" mx-auto flex flex-col w-90 items-start p-10 justify-center bg-white shadow-lg w-full border border-gray-100 hover:border-gray-800"
                key={post._id}
              >
                <h4 className="font-bold text-lg">{post.title}</h4>
                <div className="flex flex-row items-center w-full justify-between">

                <p className="font-semibold text-sm text-gray-500">
                   {new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })}{" "}
  • {post.author.name}
                </p>
                <p onClick={()=>router.push(`post/${post.slug}`)} className="font-bold hover:text-gray-700 hover:underline">
                  Read More
                </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p>You haven't posted anything</p>
            <h4>Write your first post</h4>
          </>
        )}
      </div>
    </div>
  );
}
