import create from 'zustand'
import { authh } from "./firebase"
import { provider } from "./firebase"
export const useStore = create((set) => ({
    user: null,
    loading: true,
    setUser: (inp) => set((state) => ({ user: inp })),
    setLoading: (inp) => set((state) => ({ loading: inp })),
    signup: (email,password) => {authh.createUserWithEmailAndPassword(email, password)},
    login: (email,password) => {authh.signInWithEmailAndPassword(email, password)},
    logout: () => {authh.signOut()},
   
  }));