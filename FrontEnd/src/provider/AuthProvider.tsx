import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { DelishareContext } from "../contexts/delishareContext";

export interface User {
  id: number;
  email: string;
  name: string;
  profilePhoto: string | null;
  bio: string;
}

export interface AuthContextProps {
  userInfo: User;
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
  setUserInfo: Dispatch<SetStateAction<User>>;
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
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");

    if (stored) {
      setUserInfo(JSON.parse(stored));
      setIsAuthenticated(true);
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    localStorage.clear();
    setUserInfo({} as User);
    setIsAuthenticated(false);
  };
  return (
    <DelishareContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        setIsAuthenticated: setIsAuthenticated,
        setUserInfo: setUserInfo,
        userInfo: userInfo,
        isLoading: isLoading,
        setIsLoading: setIsLoading,
        logout: logout,
      }}
    >
      {children}
    </DelishareContext.Provider>
  );
}
