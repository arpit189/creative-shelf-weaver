
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  username?: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, username?: string, name?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock API functions for now, will be replaced with real API calls
const mockLogin = (email: string, password: string): Promise<User | null> => {
  // This is a mock for demonstration purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      if ((email === 'demo@example.com' && password === 'password') || password === 'demo') {
        // Convert email to a valid username format for URLs
        const usernameFromEmail = email.split('@')[0];
        
        resolve({
          id: '1',
          username: usernameFromEmail,
          email: email,
          name: usernameFromEmail.charAt(0).toUpperCase() + usernameFromEmail.slice(1),
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
          bio: 'Designer and developer passionate about creating beautiful, functional web applications.',
          location: 'San Francisco, CA',
          website: 'https://example.com',
          social: {
            twitter: 'designerdemo',
            github: 'demodeveloper',
          }
        });
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

const mockRegister = (email: string, password: string, username?: string, name?: string): Promise<User | null> => {
  // This is a mock for demonstration purposes
  return new Promise((resolve) => {
    setTimeout(() => {
      const usernameFromEmail = username || email.split('@')[0];
      const nameFromEmail = name || (usernameFromEmail.charAt(0).toUpperCase() + usernameFromEmail.slice(1));
      
      resolve({
        id: '2',
        username: usernameFromEmail,
        email,
        name: nameFromEmail,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      });
    }, 1000);
  });
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('projectShelfUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const user = await mockLogin(email, password);
      if (user) {
        setUser(user);
        localStorage.setItem('projectShelfUser', JSON.stringify(user));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, username?: string, name?: string) => {
    setIsLoading(true);
    try {
      const user = await mockRegister(email, password, username, name);
      if (user) {
        setUser(user);
        localStorage.setItem('projectShelfUser', JSON.stringify(user));
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Registration error:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('projectShelfUser');
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!user) return false;
    
    try {
      // In a real app, we would call an API here
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('projectShelfUser', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
