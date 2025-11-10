"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useUserProfileQuery } from "../services/api";
import { useFetchPostQuery } from "../services/postapi";

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { error, loading, posts } = useAppSelector((state) => state.post);
   const {data  } = useFetchPostQuery();

   console.log("data debugging " , data);

  // ✅ RTK Query automatically fetches user profile when component mounts
  const { data: userProfile, isLoading, isError } = useUserProfileQuery();


  if (isLoading) return <p>Loading profile...</p>;
  if (isError) return <p>Failed to load profile.</p>;

  return (
    <div className="flex flex-col p-5 w-screen items-center justify-center">
      {/* Header part */}
      <div className="flex flex-row p-3 w-full items-center justify-between">
        <div>
          <h3 className="text-center text-2xl font-bold">Dashboard</h3>
          <p className="text-center text-ms font-semibold text-gray-500">
            Welcome, {userProfile?.name || "User"}
          </p>
        </div>
        <button
          onClick={() => router.push("/post")}
          className="bg-gray-800 text-lg rounded-lg text-white py-2 p-3 hover:bg-gray-700"
        >
          Add Post
        </button>
      </div>

      {/* Posts list */}
      <div>
        {data?.length > 0 ? (
          <div className="flex flex-col w-screen items-center p-10">
            {data.map((d) => (
              <div
                key={d._id}
                className="mx-auto flex flex-col w-90 items-start p-10 justify-center bg-white shadow-lg w-full border border-gray-100 hover:border-gray-800"
              >
                <h4 className="font-bold text-lg">{d.title}</h4>
                <div className="flex flex-row items-center w-full justify-between">
                  <p className="font-semibold text-sm text-gray-500">
                    {new Date(d.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}{" "}
                    • {d.author.name}
                  </p>
                  <p
                    onClick={() => router.push(`post/${d.slug}`)}
                    className="font-bold hover:text-gray-700 hover:underline cursor-pointer"
                  >
                    Read More
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <p>You haven't posted anything yet.</p>
            <h4>Write your first post</h4>
          </>
        )}
      </div>
    </div>
  );
}
