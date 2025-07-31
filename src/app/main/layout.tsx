"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "SIGNED_OUT") {
        router.push("/auth/login");
      }
    });

    return () => subscription.unsubscribe();
  }, [router, mounted]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-700">Memuat sistem...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-gray-100 to-blue-100 flex">
      {/* Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col h-screen fixed left-0 top-0 bg-white shadow-2xl border-r border-blue-100 z-40 transition-all duration-300 ${
          sidebarMinimized ? "w-20" : "w-72"
        }`}
      >
        <div className="p-4 border-b bg-blue-700 text-white flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block">
              <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                <rect
                  x="4"
                  y="8"
                  width="20"
                  height="16"
                  rx="4"
                  fill="#3B82F6"
                />
                <rect x="8" y="4" width="12" height="6" rx="2" fill="#60A5FA" />
              </svg>
            </span>
            {!sidebarMinimized && (
              <h2 className="text-lg font-extrabold">Sistem PPIC</h2>
            )}
          </div>
          <button
            className="p-2 rounded hover:bg-blue-800 transition"
            onClick={() => setSidebarMinimized(!sidebarMinimized)}
            aria-label="Minimize sidebar"
          >
            {sidebarMinimized ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`p-4 space-y-2 overflow-y-auto h-full ${
            sidebarMinimized ? "px-2" : ""
          }`}
        >
          <Link
            href="/main/dashboard"
            className={`py-2 ${
              sidebarMinimized ? "px-2 justify-center" : "px-4"
            } rounded-lg font-semibold flex items-center gap-2 transition ${
              pathname === "/main/dashboard"
                ? "bg-blue-100 text-blue-700 font-bold"
                : "hover:bg-blue-50"
            }`}
          >
            {sidebarMinimized ? (
              <span className="emoji-mono">🏠</span>
            ) : (
              <>
                <span className="emoji-mono">🏠</span> Dashboard
              </>
            )}
          </Link>
          <div className="space-y-1">
            <div
              className={`font-semibold text-blue-700 py-2 border-b ${
                sidebarMinimized ? "text-xs text-center" : ""
              }`}
            >
              {sidebarMinimized ? "📋" : "📋 Data Master"}
            </div>
            <Link
              href="/main/master-data/customers"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/master-data/customers"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>👥</span>
              ) : (
                <>
                  <span>👥</span> Pelanggan
                </>
              )}
            </Link>
            <Link
              href="/main/master-data/vendors"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/master-data/vendors"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>🏢</span>
              ) : (
                <>
                  <span>🏢</span> Vendor
                </>
              )}
            </Link>
            <Link
              href="/main/master-data/parts"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/master-data/parts"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>🔧</span>
              ) : (
                <>
                  <span>🔧</span> Produk & Komponen
                </>
              )}
            </Link>
            <Link
              href="/main/master-data/materials"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/master-data/materials"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>📦</span>
              ) : (
                <>
                  <span>📦</span> Material
                </>
              )}
            </Link>
            <Link
              href="/main/master-data/boms"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/master-data/boms"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>📋</span>
              ) : (
                <>
                  <span>📋</span> Bill of Materials
                </>
              )}
            </Link>
            <Link
              href="/main/master-data/routings"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/master-data/routings"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>🛤️</span>
              ) : (
                <>
                  <span>🛤️</span> Rute Produksi
                </>
              )}
            </Link>
          </div>
          <div className="space-y-1">
            <div
              className={`font-semibold text-blue-700 py-2 border-b ${
                sidebarMinimized ? "text-xs text-center" : ""
              }`}
            >
              {sidebarMinimized ? "📅" : "📅 Perencanaan"}
            </div>
            <Link
              href="/main/planning/sales-orders"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/planning/sales-orders"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>📝</span>
              ) : (
                <>
                  <span>📝</span> Pesanan Penjualan
                </>
              )}
            </Link>
            <Link
              href="/main/planning/forecasts"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/planning/forecasts"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>📈</span>
              ) : (
                <>
                  <span>📈</span> Peramalan
                </>
              )}
            </Link>
            <Link
              href="/main/planning/mrp"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/planning/mrp"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>⚙️</span>
              ) : (
                <>
                  <span>⚙️</span> Perencanaan Material
                </>
              )}
            </Link>
            <Link
              href="/main/planning/crp"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/planning/crp"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>🏭</span>
              ) : (
                <>
                  <span>🏭</span> Perencanaan Kapasitas
                </>
              )}
            </Link>
          </div>
          <div className="space-y-1">
            <div
              className={`font-semibold text-blue-700 py-2 border-b ${
                sidebarMinimized ? "text-xs text-center" : ""
              }`}
            >
              {sidebarMinimized ? "🚀" : "🚀 Eksekusi & Kontrol"}
            </div>
            <Link
              href="/main/execution/work-orders"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/execution/work-orders"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>🔨</span>
              ) : (
                <>
                  <span>🔨</span> Perintah Kerja
                </>
              )}
            </Link>
            <Link
              href="/main/execution/purchase-orders"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/execution/purchase-orders"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>🛒</span>
              ) : (
                <>
                  <span>🛒</span> Pesanan Pembelian
                </>
              )}
            </Link>
            <Link
              href="/main/execution/inventory/transactions"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/execution/inventory/transactions"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>📊</span>
              ) : (
                <>
                  <span>📊</span> Transaksi Inventaris
                </>
              )}
            </Link>
            <Link
              href="/main/execution/inventory/stock-take"
              className={`py-2 ${
                sidebarMinimized ? "px-2 justify-center" : "px-6"
              } text-sm rounded flex items-center gap-2 transition ${
                pathname === "/main/execution/inventory/stock-take"
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "hover:bg-blue-50"
              }`}
            >
              {sidebarMinimized ? (
                <span>📋</span>
              ) : (
                <>
                  <span>📋</span> Stock Take
                </>
              )}
            </Link>
          </div>
          {user && (
            <div
              className={`pt-4 border-t ${
                sidebarMinimized ? "flex flex-col items-center" : ""
              }`}
            >
              <span
                className={`text-sm font-semibold ${
                  sidebarMinimized ? "hidden" : ""
                }`}
              >
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className={`mt-2 px-3 py-1 bg-blue-800 rounded-lg hover:bg-blue-900 text-sm transition-colors font-semibold w-full ${
                  sidebarMinimized
                    ? "w-8 h-8 flex items-center justify-center p-0"
                    : ""
                }`}
              >
                {sidebarMinimized ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-40 animate-fadeIn"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="fixed left-0 top-0 h-full w-72 bg-white shadow-2xl border-r border-blue-100 transform transition-transform animate-slideInLeft flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b bg-blue-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                  <rect
                    x="4"
                    y="8"
                    width="20"
                    height="16"
                    rx="4"
                    fill="#3B82F6"
                  />
                  <rect
                    x="8"
                    y="4"
                    width="12"
                    height="6"
                    rx="2"
                    fill="#60A5FA"
                  />
                </svg>
                <span className="font-extrabold text-lg">Sistem PPIC</span>
              </div>
              <button
                className="p-2 rounded hover:bg-blue-800 transition"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup sidebar"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Sidebar Content */}
            <div className="flex-1 p-4 overflow-y-auto">
              <nav className="space-y-6">
                <div>
                  <Link
                    href="/main/dashboard"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg font-semibold transition ${
                      pathname === "/main/dashboard"
                        ? "bg-blue-100 text-blue-700 font-bold"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <svg
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        x="4"
                        y="8"
                        width="16"
                        height="10"
                        rx="3"
                        fill="#3B82F6"
                      />
                    </svg>
                    Dashboard
                  </Link>
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase mb-2 tracking-wide">
                    Data Master
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/main/master-data/customers"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/master-data/customers"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" fill="#3B82F6" />
                      </svg>
                      Pelanggan
                    </Link>
                    <Link
                      href="/main/master-data/vendors"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/master-data/vendors"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#10B981"
                        />
                      </svg>
                      Vendor
                    </Link>
                    <Link
                      href="/main/master-data/parts"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/master-data/parts"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#F59E0B"
                        />
                      </svg>
                      Produk & Komponen
                    </Link>
                    <Link
                      href="/main/master-data/materials"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/master-data/materials"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#A78BFA"
                        />
                      </svg>
                      Material
                    </Link>
                    <Link
                      href="/main/master-data/boms"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/master-data/boms"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-pink-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#EC4899"
                        />
                      </svg>
                      Bill of Materials
                    </Link>
                    <Link
                      href="/main/master-data/routings"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/master-data/routings"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#6B7280"
                        />
                      </svg>
                      Rute Produksi
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase mb-2 tracking-wide">
                    Perencanaan
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/main/planning/sales-orders"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/planning/sales-orders"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#3B82F6"
                        />
                      </svg>
                      Pesanan Penjualan
                    </Link>
                    <Link
                      href="/main/planning/forecasts"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/planning/forecasts"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#10B981"
                        />
                      </svg>
                      Peramalan
                    </Link>
                    <Link
                      href="/main/planning/mrp"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/planning/mrp"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#F59E0B"
                        />
                      </svg>
                      Perencanaan Material
                    </Link>
                    <Link
                      href="/main/planning/crp"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/planning/crp"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#A78BFA"
                        />
                      </svg>
                      Perencanaan Kapasitas
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase mb-2 tracking-wide">
                    Eksekusi & Kontrol
                  </div>
                  <div className="space-y-1">
                    <Link
                      href="/main/execution/work-orders"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/execution/work-orders"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-blue-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#3B82F6"
                        />
                      </svg>
                      Perintah Kerja
                    </Link>
                    <Link
                      href="/main/execution/purchase-orders"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/execution/purchase-orders"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#10B981"
                        />
                      </svg>
                      Pesanan Pembelian
                    </Link>
                    <Link
                      href="/main/execution/inventory/transactions"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/execution/inventory/transactions"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#F59E0B"
                        />
                      </svg>
                      Transaksi Inventaris
                    </Link>
                    <Link
                      href="/main/execution/inventory/stock-take"
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
                        pathname === "/main/execution/inventory/stock-take"
                          ? "bg-blue-100 text-blue-700 font-bold"
                          : "hover:bg-blue-50 text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <svg
                        className="h-5 w-5 text-purple-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <rect
                          x="4"
                          y="8"
                          width="16"
                          height="10"
                          rx="3"
                          fill="#A78BFA"
                        />
                      </svg>
                      Stock Take
                    </Link>
                  </div>
                </div>
              </nav>
              {user && (
                <div className="pt-6 mt-6 border-t">
                  <span className="text-sm font-semibold block mb-2">
                    {user.email}
                  </span>
                  <button
                    onClick={handleSignOut}
                    className="px-3 py-2 bg-blue-800 rounded-lg hover:bg-blue-900 text-sm transition-colors font-semibold w-full"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tombol sidebar mobile di kanan atas */}
      {!sidebarOpen && (
        <button
          className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-blue-700 text-white shadow-lg"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 w-full py-6 px-4 transition-all duration-300 ${
          sidebarMinimized ? "md:ml-20" : "md:ml-72"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
