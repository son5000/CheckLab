import { useContext, useState, createContext } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userName, setUserName] = useState(null);

  const login = (userData) => {
    setUserName(userData);
  };

  const logout = () => {
    setUserName(null);
  };

  return (
    <AuthContext.Provider value={{ userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
