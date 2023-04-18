import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../configs/firebaseConfig";

interface AuthContextValue {
  currentUser: User | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Sign-up successful.
    } catch (error) {
      // An error happened.
    }
  };

  const signIn = async (email: string, password: string) => {
    if (currentUser) {
      // User is already logged in
      return;
    }
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sign-in successful.
    } catch (error) {
      // An error happened.
    }
  };

  const signOut = async () => {
    const auth = getAuth();
    try {
      await fbSignOut(auth);
      // Sign-out successful.
    } catch (error) {
      // An error happened.
    }
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
