import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { DelishareContext } from "../contexts/delishareContext";

export interface User {
  id: number;
  email: string;
  name: string;
  pfp: string | null; 
  bio: string;
}

export interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");

    if (stored) {
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };
  return (
    <DelishareContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        logout: logout,
      }}
    >
      {children}
    </DelishareContext.Provider>
  );
}
