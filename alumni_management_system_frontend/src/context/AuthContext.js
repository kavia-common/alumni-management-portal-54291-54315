import React, { createContext, useContext, useEffect, useState } from "react";
import { mockAuthApi } from "../services/mockApi";

// PUBLIC_INTERFACE
export const AuthContext = createContext(null);

/**
 * PUBLIC_INTERFACE
 * Provides authentication state and actions to the app.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("ams_user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setInitializing(false);
  }, []);

  const login = async (email, password) => {
    const result = await mockAuthApi.login(email, password);
    setUser(result);
    localStorage.setItem("ams_user", JSON.stringify(result));
    return result;
  };

  const register = async (payload) => {
    const result = await mockAuthApi.register(payload);
    setUser(result);
    localStorage.setItem("ams_user", JSON.stringify(result));
    return result;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ams_user");
  };

  const value = { user, initializing, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PUBLIC_INTERFACE
export const useAuth = () => useContext(AuthContext);
