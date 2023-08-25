import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import User from '@/interfaces/user.interface';

import STORAGE_KEYS from '@/utils/storage-keys.util';

type UserState = {
  currentUser: User | null;
  updateUser: (user: User) => void;
  resetState: () => void;
  updateEmail: (email: string) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set, get) => ({
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
      }),
      { name: STORAGE_KEYS.USER }
    )
  )
);
