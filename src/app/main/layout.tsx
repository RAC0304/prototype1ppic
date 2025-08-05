"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '@/lib/fontawesome';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
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
        className={`hidden md:flex flex-col h-screen fixed left-0 top-0 bg-gradient-to-b from-white to-blue-50/30 backdrop-blur-sm shadow-2xl border-r border-blue-200/50 z-40 transition-all duration-500 ease-in-out transform ${
          sidebarMinimized ? "w-20" : "w-72"
        }`}
        style={{
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)'
        }}
      >
        <div className="p-4 border-b bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white flex items-center gap-2 justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-50"></div>
          <div className="flex items-center gap-2 relative z-10">
            <span className={`inline-block transition-all duration-300 ${sidebarMinimized ? 'scale-90' : 'scale-100'}`}>
              <div className="w-7 h-7 bg-blue-400 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon 
                  icon="industry" 
                  className="text-white text-sm animate-pulse" 
                />
              </div>
            </span>
            <div className={`transition-all duration-500 ease-in-out ${
              sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}>
              <h2 className="text-lg font-extrabold tracking-tight">Sistem PPIC</h2>
            </div>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-blue-800/50 transition-all duration-300 hover:scale-110 relative z-10 backdrop-blur-sm"
            onClick={() => setSidebarMinimized(!sidebarMinimized)}
            aria-label="Minimize sidebar"
          >
            <FontAwesomeIcon
              icon={sidebarMinimized ? "chevron-right" : "chevron-left"}
              className="h-4 w-4 transition-transform duration-300"
            />
          </button>
        </div>
        <div
          className={`p-4 space-y-3 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent hover:scrollbar-thumb-blue-400 ${
            sidebarMinimized ? "px-2" : ""
          }`}
        >
          <Link
            href="/main/dashboard"
            className={`group py-3 ${
              sidebarMinimized ? "px-2 justify-center" : "px-4"
            } rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${
              pathname === "/main/dashboard"
                ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-md border border-blue-200"
                : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <FontAwesomeIcon 
              icon="home" 
              className={`text-lg transition-transform duration-300 group-hover:scale-110 ${
                pathname === "/main/dashboard" ? "animate-bounce text-blue-600" : "text-blue-500"
              }`}
            />
            <span className={`transition-all duration-500 ease-in-out relative z-10 ${
              sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
            }`}>
              Dashboard
            </span>
          </Link>
          
          <div className="space-y-2">
            <div
              className={`font-bold text-blue-700 py-3 border-b border-blue-200/50 flex items-center gap-2 transition-all duration-300 ${
                sidebarMinimized ? "text-xs justify-center" : ""
              }`}
            >
              <FontAwesomeIcon icon="clipboard-list" className="text-base text-blue-600" />
              <span className={`transition-all duration-500 ease-in-out ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Data Master
              </span>
            </div>
            <Link
              href="/main/master-data/customers"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/master-data/customers"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="users" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-blue-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Pelanggan
              </span>
            </Link>
            <Link
              href="/main/master-data/vendors"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/master-data/vendors"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="building" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Vendor
              </span>
            </Link>
            <Link
              href="/main/master-data/parts"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/master-data/parts"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="wrench" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-orange-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Produk & Komponen
              </span>
            </Link>
            <Link
              href="/main/master-data/materials"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/master-data/materials"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="box" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Material
              </span>
            </Link>
            <Link
              href="/main/master-data/boms"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/master-data/boms"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="list" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-pink-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Bill of Materials
              </span>
            </Link>
            <Link
              href="/main/master-data/routings"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/master-data/routings"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="route" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-gray-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Rute Produksi
              </span>
            </Link>
          </div>
          
          <div className="space-y-2">
            <div
              className={`font-bold text-blue-700 py-3 border-b border-blue-200/50 flex items-center gap-2 transition-all duration-300 ${
                sidebarMinimized ? "text-xs justify-center" : ""
              }`}
            >
              <FontAwesomeIcon icon="calendar-alt" className="text-base text-blue-600" />
              <span className={`transition-all duration-500 ease-in-out ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Perencanaan
              </span>
            </div>
            <Link
              href="/main/planning/sales-orders"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/planning/sales-orders"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="file-invoice" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-blue-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Pesanan Penjualan
              </span>
            </Link>
            <Link
              href="/main/planning/forecasts"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/planning/forecasts"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="chart-line" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Peramalan
              </span>
            </Link>
            <Link
              href="/main/planning/mrp"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/planning/mrp"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="cog" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-yellow-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Perencanaan Material
              </span>
            </Link>
            <Link
              href="/main/planning/crp"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/planning/crp"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="industry" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Perencanaan Kapasitas
              </span>
            </Link>
          </div>
          
          <div className="space-y-2">
            <div
              className={`font-bold text-blue-700 py-3 border-b border-blue-200/50 flex items-center gap-2 transition-all duration-300 ${
                sidebarMinimized ? "text-xs justify-center" : ""
              }`}
            >
              <FontAwesomeIcon icon="rocket" className="text-base text-blue-600" />
              <span className={`transition-all duration-500 ease-in-out ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Eksekusi & Kontrol
              </span>
            </div>
            <Link
              href="/main/execution/work-orders"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/execution/work-orders"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="hammer" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-blue-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Perintah Kerja
              </span>
            </Link>
            <Link
              href="/main/execution/purchase-orders"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/execution/purchase-orders"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="shopping-cart" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Pesanan Pembelian
              </span>
            </Link>
            <Link
              href="/main/execution/inventory/transactions"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/execution/inventory/transactions"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="chart-bar" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-yellow-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Transaksi Inventaris
              </span>
            </Link>
            <Link
              href="/main/execution/inventory/stock-take"
              className={`group py-2.5 ${
                sidebarMinimized ? "px-2 justify-center" : "px-4 ml-2"
              } text-sm rounded-lg flex items-center gap-3 transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                pathname === "/main/execution/inventory/stock-take"
                  ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                  : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <FontAwesomeIcon 
                icon="boxes" 
                className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
              />
              <span className={`transition-all duration-500 ease-in-out relative z-10 ${
                sidebarMinimized ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'
              }`}>
                Stock Take
              </span>
            </Link>
          </div>
          {user && (
            <div
              className={`pt-6 mt-4 border-t border-blue-200/50 backdrop-blur-sm ${
                sidebarMinimized ? "flex flex-col items-center" : ""
              }`}
            >
              <div className={`transition-all duration-500 ease-in-out ${
                sidebarMinimized ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100 h-auto mb-3'
              }`}>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-semibold text-gray-700 truncate">{user.email}</span>
                </div>
              </div>
              <button
                onClick={handleSignOut}
                className={`group relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl hover:from-blue-800 hover:to-blue-900 text-sm transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 w-full ${
                  sidebarMinimized
                    ? "w-10 h-10 flex items-center justify-center p-0 rounded-full"
                    : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {sidebarMinimized ? (
                  <FontAwesomeIcon
                    icon="sign-out-alt"
                    className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180"
                  />
                ) : (
                  <span className="relative z-10 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon="sign-out-alt"
                      className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                    />
                    Logout
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fadeIn transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        >
          <div
            className="fixed left-0 top-0 h-full w-72 bg-gradient-to-b from-white to-blue-50/30 backdrop-blur-sm shadow-2xl border-r border-blue-200/50 transform transition-all duration-500 ease-out animate-slideInLeft flex flex-col"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(59, 130, 246, 0.1)'
            }}
          >
            {/* Sidebar Header */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-700 via-blue-600 to-blue-700 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-50"></div>
              <div className="flex items-center gap-2 relative z-10">
                <div className="w-7 h-7 bg-blue-400 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon 
                    icon="industry" 
                    className="text-white text-sm animate-pulse" 
                  />
                </div>
                <span className="font-extrabold text-lg tracking-tight">Sistem PPIC</span>
              </div>
              <button
                className="p-2 rounded-lg hover:bg-blue-800/50 transition-all duration-300 hover:scale-110 relative z-10 backdrop-blur-sm"
                onClick={() => setSidebarOpen(false)}
                aria-label="Tutup sidebar"
              >
                <FontAwesomeIcon
                  icon="times"
                  className="h-4 w-4 transition-transform duration-300 hover:rotate-90"
                />
              </button>
            </div>
            {/* Sidebar Content */}
            <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-transparent hover:scrollbar-thumb-blue-400">
              <nav className="space-y-6">
                <div>
                  <Link
                    href="/main/dashboard"
                    className={`group flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg relative overflow-hidden ${
                      pathname === "/main/dashboard"
                        ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-md border border-blue-200"
                        : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <FontAwesomeIcon 
                      icon="home" 
                      className={`text-lg transition-transform duration-300 group-hover:scale-110 relative z-10 ${
                        pathname === "/main/dashboard" ? "animate-bounce text-blue-600" : "text-blue-500"
                      }`}
                    />
                    <span className="relative z-10">Dashboard</span>
                  </Link>
                </div>
                
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase mb-3 tracking-wide flex items-center gap-2">
                    <FontAwesomeIcon icon="clipboard-list" className="text-base text-blue-600" />
                    Data Master
                  </div>
                  <div className="space-y-2 ml-2">
                    <Link
                      href="/main/master-data/customers"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/master-data/customers"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="users" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-blue-500" 
                      />
                      <span className="relative z-10">Pelanggan</span>
                    </Link>
                    <Link
                      href="/main/master-data/vendors"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/master-data/vendors"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="building" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" 
                      />
                      <span className="relative z-10">Vendor</span>
                    </Link>
                    <Link
                      href="/main/master-data/parts"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/master-data/parts"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="wrench" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-orange-500" 
                      />
                      <span className="relative z-10">Produk & Komponen</span>
                    </Link>
                    <Link
                      href="/main/master-data/materials"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/master-data/materials"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="box" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
                      />
                      <span className="relative z-10">Material</span>
                    </Link>
                    <Link
                      href="/main/master-data/boms"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/master-data/boms"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="list" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-pink-500" 
                      />
                      <span className="relative z-10">Bill of Materials</span>
                    </Link>
                    <Link
                      href="/main/master-data/routings"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/master-data/routings"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="route" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-gray-500" 
                      />
                      <span className="relative z-10">Rute Produksi</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase mb-3 tracking-wide flex items-center gap-2">
                    <FontAwesomeIcon icon="calendar-alt" className="text-base text-blue-600" />
                    Perencanaan
                  </div>
                  <div className="space-y-2 ml-2">
                    <Link
                      href="/main/planning/sales-orders"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/planning/sales-orders"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="file-invoice" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-blue-500" 
                      />
                      <span className="relative z-10">Pesanan Penjualan</span>
                    </Link>
                    <Link
                      href="/main/planning/forecasts"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/planning/forecasts"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="chart-line" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" 
                      />
                      <span className="relative z-10">Peramalan</span>
                    </Link>
                    <Link
                      href="/main/planning/mrp"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/planning/mrp"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="cog" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" 
                      />
                      <span className="relative z-10">Perencanaan Material</span>
                    </Link>
                    <Link
                      href="/main/planning/crp"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/planning/crp"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="industry" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-green-500" 
                      />
                      <span className="relative z-10">Perencanaan Kapasitas</span>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-700 uppercase mb-3 tracking-wide flex items-center gap-2">
                    <FontAwesomeIcon icon="rocket" className="text-lg text-blue-700" />
                    Eksekusi & Kontrol
                  </div>
                  <div className="space-y-2 ml-2">
                    <Link
                      href="/main/execution/work-orders"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/execution/work-orders"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="hammer" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
                      />
                      <span className="relative z-10">Perintah Kerja</span>
                    </Link>
                    <Link
                      href="/main/execution/purchase-orders"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/execution/purchase-orders"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="shopping-cart" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
                      />
                      <span className="relative z-10">Pesanan Pembelian</span>
                    </Link>
                    <Link
                      href="/main/execution/inventory/transactions"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/execution/inventory/transactions"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="chart-bar" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
                      />
                      <span className="relative z-10">Transaksi Inventaris</span>
                    </Link>
                    <Link
                      href="/main/execution/inventory/stock-take"
                      className={`group flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 relative overflow-hidden ${
                        pathname === "/main/execution/inventory/stock-take"
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-bold shadow-sm border border-blue-200"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent text-gray-700"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <FontAwesomeIcon 
                        icon="clipboard-list" 
                        className="text-sm transition-transform duration-300 group-hover:scale-110 relative z-10 text-purple-500" 
                      />
                      <span className="relative z-10">Stock Take</span>
                    </Link>
                  </div>
                </div>
              </nav>
              {user && (
                <div className="pt-6 mt-6 border-t border-blue-200/50 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-sm mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-gray-700 truncate">{user.email}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="group relative overflow-hidden px-4 py-2.5 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl hover:from-blue-800 hover:to-blue-900 text-sm transition-all duration-300 font-semibold text-white shadow-lg hover:shadow-xl hover:scale-105 w-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <FontAwesomeIcon
                        icon="sign-out-alt"
                        className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                      />
                      Logout
                    </span>
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
          className="md:hidden fixed top-4 right-4 z-50 p-3 rounded-xl bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-2xl hover:shadow-3xl hover:from-blue-800 hover:to-blue-900 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-blue-600/20"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <FontAwesomeIcon
            icon="bars"
            className="h-5 w-5 transition-transform duration-300 hover:rotate-180"
          />
        </button>
      )}

      {/* Main Content */}
      <main
        className={`flex-1 w-full py-6 px-4 transition-all duration-500 ease-in-out ${
          sidebarMinimized ? "md:ml-20" : "md:ml-72"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
