
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, AuthState, LoginCredentials, RegisterData } from '@/types';
import { mockUsers } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  });

  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem('user');
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // In a real app, this would be an API call
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Simulate JWT token storage
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(user));
      
      setAuthState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null,
      });
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // Check if user already exists
      if (mockUsers.some(u => u.email === data.email)) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser: User = {
        id: `user${mockUsers.length + 1}`,
        name: data.name,
        email: data.email,
        role: data.role,
      };
      
      // Add to mock data (this would be handled by the backend in a real app)
      mockUsers.push(newUser);
      
      // Simulate JWT token storage
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('user', JSON.stringify(newUser));
      
      setAuthState({
        isAuthenticated: true,
        user: newUser,
        loading: false,
        error: null,
      });
      
      toast({
        title: "Registration successful",
        description: `Welcome, ${newUser.name}!`,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive",
      });
    }
  };

  const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
    
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
