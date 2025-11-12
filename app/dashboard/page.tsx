"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserProfileQuery } from "../services/api";
import { useFetchPostQuery } from "../services/postapi";

export default function Dashboard() {
  const [page , setpage] = useState(1);
  const limit = 5 ;
  const router = useRouter();
  const { data } = useFetchPostQuery({page : page , limit : limit});
  const totalpage = data?.totalPages || 1 ;
  const { data: userProfile, isLoading, isError } = useUserProfileQuery();


    const handleNext = () => {
    if (page < totalpage) setpage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1 ) setpage(prev => prev - 1);
  };


  console.log("debuugin the image url in dahsboar" , data)
  if (isLoading) return <p className="text-center mt-10">Loading profile...</p>;
  if (isError) return <p className="text-center mt-10 text-red-500">Failed to load profile.</p>;

  return (
    <div className="flex flex-col p-6 min-h-screen w-full items-center bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-row p-4 w-full max-w-6xl items-center justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-800">Dashboard</h3>
          <p className="text-gray-500 font-medium">
            Welcome, <span className="text-[#d4515b]">{userProfile?.name || "User"}</span>
          </p>
        </div>

        <button
          onClick={() => router.push("/post")}
          className="bg-[#d4515b] ho
          ver:bg-[#c04450] text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
        >
          + Add Post
        </button>
      </div>

      {/* Posts List */}
      <div className="flex flex-col gap-6 w-full max-w-5xl mt-8">
        {data?.posts?.length > 0 ? (
          data.posts.map((d) => (
            <div
              key={d._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-100 overflow-hidden"
            >
              {/* Post Image */}
              {d.imageUrl && (
                <div className="w-full h-64 overflow-hidden">

                  <img
                    src={`http://localhost:3000${d.imageUrl}`}
                    alt={d.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    
                  />
                </div>
              )}

              {/* Post Content */}
              <div className="p-6 flex flex-col gap-3">
                <h4 className="font-bold text-[#d4515b] text-2xl">{d.title}</h4>
                <p className="text-gray-600 leading-relaxed line-clamp-3">
                  {d.content || "No content preview available..."}
                </p>

                <div className="flex flex-row items-center justify-between mt-4 text-sm text-gray-500">
                  <p>
                    {new Date(d.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    • <span className="font-semibold">{d.author.name}</span>
                  </p>

                  <p
                    onClick={() => router.push(`/post/${d.slug}`)}
                    className="font-semibold text-[#d4515b] hover:text-[#c04450] cursor-pointer"
                  >
                    Read More →
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center mt-16">
            <p className="text-gray-500">You haven't posted anything yet.</p>
            <h4 className="text-[#d4515b] font-semibold mt-2 cursor-pointer hover:underline" onClick={() => router.push("/post")}>
              Write your first post →
            </h4>
          </div>
        )}
      </div>
      <div className="flex flex-row items-center justify-center gap-5 w-full">
          <button
          onClick={handlePrev}
          className="bg-[#d4515b] ho
          ver:bg-[#c04450] text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
          disabled={page ===1}
          
        >
          prev
        </button>
          <button
          onClick={handleNext}
          className="bg-[#d4515b] ho
          ver:bg-[#c04450] text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-all"
          disabled = {page == totalpage}
        >
          next
        </button>
      </div>
    </div>
  );
}
