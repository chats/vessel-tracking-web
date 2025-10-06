import { useState, useEffect } from 'react';
import type { User } from '../../domain/entities/User';
import { fakeAuth } from '../../infrastructure/auth/fakeAuth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = fakeAuth.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    const authenticatedUser = fakeAuth.login(username, password);
    if (authenticatedUser) {
      fakeAuth.setCurrentUser(authenticatedUser);
      setUser(authenticatedUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    fakeAuth.logout();
    setUser(null);
  };

  return { user, loading, login, logout };
};
