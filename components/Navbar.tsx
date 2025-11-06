"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch , useAppSelector } from "@/app/redux/hooks";
import { logout , setCredentials } from "@/app/redux/slices/authSlice";
interface User {
  name : string ,
  email : string ,
  password : string ,
  role: string  ,
  author? : string
}

export default function Navbar() {

  const router = useRouter();
  const dispatch = useAppDispatch();
  const {access_token , user} = useAppSelector((state)=> state.auth);


    useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !access_token) {
      dispatch(setCredentials({ user: user, access_token: token }));
    }
  }, [dispatch, access_token, user]);
 

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full bg-white border-b border-gray-300 px-12 py-4">
      {/* Left box */}
      <div className="flex items-center justify-center">
        <h3 className="text-lg font-semibold">BlogHub</h3>
      </div>

      {/* Right box */}
      <div className="flex items-center gap-8">
        <Link
          href="/features"
          className="text-gray-500 hover:text-gray-800 text-base font-semibold"
        >
          Features
        </Link>

        {!access_token ? (
          <>
            <Link
              href="/login"
              className="text-gray-500 hover:text-gray-800 text-base font-semibold"
            >
              Login
            </Link>
            <Link href="/signup">
              <button onClick={()=> router.push("/signup")} className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-800 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
