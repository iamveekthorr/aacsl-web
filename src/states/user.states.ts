import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import User, { UserDetails } from '../interfaces/user.interface';

import STORAGE_KEYS from '@/utils/storage-keys.util';

type UserState = {
  currentUser: User | null;
  updateUser: (user: User) => void;
  resetState: () => void;
  updateEmail: (email: string) => void;
  updateNames: (firstName: string, lastName: string) => void;
  updateProfile: (profile: UserDetails) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        updateUser: (user) => set({ currentUser: user }),
        resetState: () => set({ currentUser: null }),
        updateEmail: (email: string) =>
          set(
            (state) =>
              ({
                currentUser: {
                  ...state.currentUser,
                  user: {
                    ...state.currentUser?.user,
                    email,
                  },
                },
              }) as UserState
          ),
        updateNames: (firstName: string, lastName: string) =>
          set(
            (state) =>
              ({
                currentUser: {
                  ...state.currentUser,
                  user: {
                    ...state.currentUser?.user,
                    firstName,
                    lastName,
                  },
                },
              }) as UserState
          ),
        updateProfile: (profile) =>
          set(
            (state) =>
              ({
                ...state,
                currentUser: {
                  ...state.currentUser,
                  user: { ...profile, ...state.currentUser?.user },
                },
              }) as UserState
          ),
      }),
      { name: STORAGE_KEYS.USER }
    )
  )
);
