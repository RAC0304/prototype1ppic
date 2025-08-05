"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard after a short delay to avoid hydration issues
    const timer = setTimeout(() => {
      router.push("/main/dashboard");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center">
          {/* Logo Area */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m11 0a2 2 0 01-2 2H5a2 2 0 01-2-2m0 0V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10M7 11h10M7 15h10"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Sistem PPIC
            </h1>
            <p className="text-gray-600">
              Production Planning & Inventory Control
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-6">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Menginisialisasi sistem...
            </p>
          </div>

          {/* Features Preview */}
          <div className="space-y-3 text-left">
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Dashboard & Analytics</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <span>Material Requirements Planning</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
              <span>Inventory Management</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
              <span>Production Control</span>
            </div>
          </div>

          {/* Manual Navigation */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-3">Atau akses langsung:</p>
            <button
              onClick={() => router.push("/main/dashboard")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              Masuk ke Dashboard
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs text-gray-500">
            © 2025 Sistem PPIC - Production Planning & Inventory Control
          </p>
        </div>
      </div>
    </div>
  );
}
