"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        router.push("/main/dashboard");
      }
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gray-50">
      {/* Kiri: Form Login */}
      <div className="flex flex-col justify-center items-center w-full max-w-md mx-auto px-8 py-10 bg-white/90 rounded-2xl shadow-2xl z-10 relative border border-gray-200 backdrop-blur-md">
        {/* Logo perusahaan */}
        <div className="mx-auto mb-4 h-20 w-20 relative drop-shadow-lg">
          <Image
            src="/file.svg"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 tracking-tight font-sans drop-shadow-sm">
          Sistem PPIC
        </h2>
        <p className="mt-2 text-center text-base text-gray-500 font-medium">
          Masuk ke akun Anda
        </p>
        <form
          className="mt-8 space-y-6 w-full"
          onSubmit={handleSignIn}
          autoComplete="off"
        >
          <div className="rounded-xl shadow-inner bg-gray-50/80 border border-gray-200 p-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200 bg-white/90 shadow-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 transition-all duration-200 bg-white/90 shadow-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center font-semibold animate-pulse">
              {error}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-400 border-gray-300 rounded shadow-sm transition-all duration-150"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-700 select-none"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-semibold text-indigo-500 hover:text-indigo-700 transition-colors duration-150"
              >
                Lupa Password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !email || !password}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-semibold rounded-lg text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400 disabled:opacity-50 shadow-md transition-all duration-200"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    ></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
          <div className="text-center mt-4">
            <span className="text-gray-400 text-sm">Belum punya akun?</span>
            <button
              disabled
              className="ml-1 text-indigo-300 text-sm cursor-not-allowed font-semibold"
              tabIndex={-1}
            >
              Register
            </button>
            <div className="mt-6 text-xs text-gray-500 flex items-center justify-center bg-gray-100 rounded-md py-2 px-1 border border-gray-200">
              <span className="mr-2 text-lg">ⓘ</span> Sistem ini hanya untuk
              pengguna resmi perusahaan.
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
