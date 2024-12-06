import { create } from 'zustand';
import { User, Space, Position } from '../types';

interface GameState {
  currentUser: User | null;
  currentSpace: Space | null;
  players: Map<string, { user: User; position: Position }>;
  setCurrentUser: (user: User | null) => void;
  setCurrentSpace: (space: Space | null) => void;
  updatePlayerPosition: (userId: string, position: Position) => void;
  removePlayer: (userId: string) => void;
}

export const useStore = create<GameState>((set) => ({
  currentUser: null,
  currentSpace: null,
  players: new Map(),
  setCurrentUser: (user) => set({ currentUser: user }),
  setCurrentSpace: (space) => set({ currentSpace: space }),
  updatePlayerPosition: (userId, position) =>
    set((state) => {
      const players = new Map(state.players);
      const player = players.get(userId);
      if (player) {
        players.set(userId, { ...player, position });
      }
      return { players };
    }),
  removePlayer: (userId) =>
    set((state) => {
      const players = new Map(state.players);
      players.delete(userId);
      return { players };
    }),
}));