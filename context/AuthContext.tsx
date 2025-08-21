import React, { createContext, useContext, useState, useEffect } from 'react';
import { useData } from './DataContext';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => string;
  logout: () => void;
  updateCurrentUser: (user: User) => void;
  loginAsNewUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = 'userId';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { users, updateCurrentUserProfile, addLoginActivity, updateUserLastLogin, addEmailLog } = useData();
  
  useEffect(() => {
    // Check session storage on initial load
    const storedUserId = sessionStorage.getItem(SESSION_KEY);
    if (storedUserId && users.length > 0) {
      const user = users.find(u => u.id === parseInt(storedUserId, 10));
      if (user) {
        setCurrentUser(user);
      }
    }
  }, [users]);

  const login = (email: string, password: string): string => {
    const user = users.find(u => u.email === email);

    if (!user) {
      return "User not found. Please check your email.";
    }
    
    if (user.password !== password) {
      return "Invalid password. Please try again.";
    }
    
    if (user.status !== 'active') {
        return "This account is inactive. Please contact an administrator.";
    }

    sessionStorage.setItem(SESSION_KEY, user.id.toString());
    const loggedInUser = { ...user, lastLogin: new Date().toISOString() };
    setCurrentUser(loggedInUser);
    addLoginActivity(user.name);
    updateUserLastLogin(user.id);
    addEmailLog({
      recipient: user.email,
      subject: 'Security Alert: New Login',
      body: `Hi ${user.name},\n\nWe detected a new login to your account at ${new Date().toLocaleString()}. If this was not you, please contact an administrator immediately.`
    });
    return 'success';
  };
  
  const loginAsNewUser = (user: User) => {
    sessionStorage.setItem(SESSION_KEY, user.id.toString());
    setCurrentUser(user);
    addLoginActivity(user.name);
    updateUserLastLogin(user.id);
  };

  const logout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
  };
  
  const updateCurrentUser = (user: User) => {
    updateCurrentUserProfile(user);
    setCurrentUser(user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoggedIn: !!currentUser, login, logout, updateCurrentUser, loginAsNewUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};