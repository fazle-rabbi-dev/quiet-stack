import { getAuthUser } from "@/lib/actions/auth.action";
import { create } from "zustand";

interface AuthState {
  isLoading: boolean;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  hydrateAuth: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  isLoading: true,
  isLoggedIn: false,

  hydrateAuth: async () => {
    const user = await getAuthUser();
    set({ isLoading: false, isLoggedIn: !!user });
  },

  setIsLoggedIn: (value) => {
    set({ isLoggedIn: value ?? true });
  },
}));
