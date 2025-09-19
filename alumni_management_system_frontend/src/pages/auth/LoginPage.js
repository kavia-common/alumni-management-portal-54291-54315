import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * PUBLIC_INTERFACE
 * Login page using mock auth API.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await login(email, password);
      navigate("/", { replace: true });
    } catch (err) {
      setError("Failed to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md card p-6">
        <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-4">Sign in to continue</p>

        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <p className="text-xs text-gray-500 mt-1">Tip: Use +alumni, +coord, +place, +office to test roles.</p>
          </div>
          <div>
            <label className="label">Password</label>
            <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button className="btn btn-primary w-full" disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
          No account? <Link to="/register" className="text-rose-600 font-medium">Create one</Link>
        </p>
      </div>
    </div>
  );
}
