"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [storedUser, setStoredUser] = useState(null);
  const [posts , setPosts] = useState([]);

  
const fetchPost = async () => {
  try {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    // Make sure token exists
    if (!token) {
      console.warn("No token found in localStorage");
      return;
    }

    // Send request with token in Authorization header
    const res = await axios.get("http://localhost:3000/posts", {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 Important
      },
    });

    console.log(res.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

    useEffect(()=>{
       fetchPost();
    } , [posts])

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData); // ✅ convert string → object
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
        <button className="bg-gray-800 text-lg rounded-lg text-white py-2 p-3 hover:bg-gray-700">
          Add Post
        </button>
      </div>

      <div>
         {posts ? (
    <>
           <p>You haven't posted anything</p>
      <h4>Write your first post</h4>
    </>
  ) : (
    <>
      <p>fetching</p>
    </>
  )}
      </div>
    </div>
  );
}
