import { createContext, useState, ReactNode } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';

interface AuthContextType {
  isUserLoggedIn: boolean;
  setIsUserLoggedIn: (isLoggedIn: boolean) => void;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

	const logout = async () => {
    try {
      await signOut(auth);
      setIsUserLoggedIn(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

