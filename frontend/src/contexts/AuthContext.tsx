import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuthStore } from '../store/authStore';
import api from '../services/api';

interface AuthContextType {
  isAuthenticated: boolean;
  user: any | null; // Replace 'any' with a proper User type
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { token, user, setUser, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const validateToken = async () => {
      if (token) {
        try {
          // You might have a /auth/me endpoint to verify the token and get fresh user data
          const response = await api.get('/auth/me'); 
          setUser(response.data);
        } catch (error) {
          console.error('Token validation failed', error);
          logout();
        }
      }
      setIsLoading(false);
    };

    validateToken();
  }, [token, setUser, logout]);

  const value = {
    isAuthenticated: !!token,
    user,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
