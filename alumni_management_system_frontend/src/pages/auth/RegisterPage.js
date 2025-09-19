import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Registration page with role choice.
 */
export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    department: "",
    year: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(false);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate("/", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-lg card p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Create your account</h1>
        <p className="text-sm text-gray-500 mb-4">Join the Alumni Management System</p>

        <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Full Name</label>
            <input className="input" value={form.name} onChange={(e)=>update("name", e.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Email</label>
            <input className="input" type="email" value={form.email} onChange={(e)=>update("email", e.target.value)} required />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Password</label>
            <input className="input" type="password" value={form.password} onChange={(e)=>update("password", e.target.value)} required />
          </div>
          <div>
            <label className="label">Role</label>
            <select className="input" value={form.role} onChange={(e)=>update("role", e.target.value)}>
              <option>Student</option>
              <option>Alumni</option>
              <option>Coordinator</option>
              <option>PlacementIncharge</option>
              <option>OfficeIncharge</option>
            </select>
          </div>
          <div>
            <label className="label">Department</label>
            <input className="input" value={form.department} onChange={(e)=>update("department", e.target.value)} placeholder="e.g., CSE" />
          </div>
          <div>
            <label className="label">Year</label>
            <input className="input" type="number" value={form.year} onChange={(e)=>update("year", Number(e.target.value))} />
          </div>
          <div className="sm:col-span-2">
            <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
          </div>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-rose-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
