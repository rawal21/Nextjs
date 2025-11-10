"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { logout } from "@/app/redux/slices/authSlice";

export default function Navbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="flex flex-row items-center justify-between w-full bg-white border-b border-gray-300 px-12 py-4">
      {/* Left Section */}
      <h3 className="text-lg font-semibold">BlogHub</h3>

      {/* Right Section */}
      <div className="flex items-center gap-8">
        <Link
          href="/features"
          className="text-gray-500 hover:text-gray-800 text-base font-semibold"
        >
          Features
        </Link>

        {!accessToken ? (
          <>
            <Link
              href="/login"
              className="text-gray-500 hover:text-gray-800 text-base font-semibold"
            >
              Login
            </Link>
            <button
              onClick={() => router.push("/signup")}
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium px-4 py-2 rounded-lg transition duration-200"
            >
              Sign Up
            </button>
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
