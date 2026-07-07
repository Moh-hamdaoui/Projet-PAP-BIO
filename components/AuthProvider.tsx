"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, type SessionUser } from "@/lib/auth";

const AuthContext = createContext<SessionUser | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());

    function handleAuthChange() {
      setUser(getCurrentUser());
    }

    window.addEventListener("pap-bio-auth-change", handleAuthChange);
    return () => window.removeEventListener("pap-bio-auth-change", handleAuthChange);
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
