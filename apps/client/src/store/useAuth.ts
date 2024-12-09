import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  
  user: User | null;
    setUser: (user: User | null) => void;
    unSetUser: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  setUser: (user: User | null) => {
    localStorage.setItem('token', JSON.stringify(user?.token));

    return set({ user });
  },
  unSetUser: () => {
    localStorage.removeItem('token');
    return set({ user: null });
  },
}));
