import React, { createContext, useContext, useState } from "react";
import * as SecureStore from "expo-secure-store";

interface User {
  id: string;
  name: string;
  role: string;
}

interface SessionContextType {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
  isLoadingSession: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  // 🔥 Only restored when RootLayout manually calls restoreSession()
  const restoreSession = async () => {
    setIsLoadingSession(true);

    try {
      const storedToken = await SecureStore.getItemAsync("auth_token");
      const storedUser = await SecureStore.getItemAsync("auth_user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to load session:", error);
    } finally {
      setIsLoadingSession(false);
    }
  };

  const login = async (token: string, user: User) => {
    await SecureStore.setItemAsync("auth_token", token);
    await SecureStore.setItemAsync("auth_user", JSON.stringify(user));

    setToken(token);
    setUser(user);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("auth_token");
    await SecureStore.deleteItemAsync("auth_user");

    setToken(null);
    setUser(null);
  };

  return (
    <SessionContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        restoreSession,
        isLoadingSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used inside SessionProvider");
  return context;
}
