import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import clsx from "clsx";

const roleMenu = {
  Student: [
    { to: "/student", label: "Dashboard" },
    { to: "/profile", label: "My Profile" },
    { to: "/requests", label: "Requests" },
    { to: "/jobs", label: "Jobs" },
  ],
  Alumni: [
    { to: "/alumni", label: "Dashboard" },
    { to: "/profile", label: "My Profile" },
    { to: "/requests", label: "Requests" },
    { to: "/jobs", label: "Jobs" },
  ],
  Coordinator: [
    { to: "/coordinator", label: "Dashboard" },
    { to: "/alumni-collection", label: "Alumni Collection" },
    { to: "/approvals", label: "Approvals" },
    { to: "/jobs", label: "Jobs" },
  ],
  PlacementIncharge: [
    { to: "/placement", label: "Dashboard" },
    { to: "/jobs", label: "Manage Jobs" },
    { to: "/approvals", label: "Approvals" },
  ],
  OfficeIncharge: [
    { to: "/office", label: "Dashboard" },
    { to: "/alumni-collection", label: "Alumni Collection" },
    { to: "/approvals", label: "Approvals" },
    { to: "/requests", label: "Requests" },
  ],
};

export default function MainLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const menu = roleMenu[user?.role] || [];

  return (
    <div className="min-h-screen gradient-bg">
      <nav className="sticky top-0 z-20 bg-white/70 backdrop-blur border-b border-white/60">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-bold">AM</div>
            <div>
              <p className="text-sm text-gray-500">Alumni Management System</p>
              <h1 className="text-lg font-semibold text-gray-900">Ocean Professional</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-gray-600">
              {user?.name} • <span className="font-medium">{user?.role}</span>
            </span>
            <button onClick={logout} className="btn btn-secondary">Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <div className="card p-3">
            <nav className="flex lg:flex-col gap-2">
              {menu.map((m) => (
                <Link
                  key={m.to}
                  to={m.to}
                  className={clsx(
                    "px-3 py-2 rounded-xl transition",
                    location.pathname === m.to
                      ? "bg-primary/15 text-rose-600 font-medium"
                      : "hover:bg-gray-50"
                  )}
                >
                  {m.label}
                </Link>
              ))}
            </nav>
          </div>
        </aside>
        <main className="lg:col-span-9">
          <div className="card p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
