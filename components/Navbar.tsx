"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  name : string ,
  email : string ,
  password : string ,
  role: string  ,
  author? : string
}

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login"); // redirect after logout
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

        {!token ? (
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
