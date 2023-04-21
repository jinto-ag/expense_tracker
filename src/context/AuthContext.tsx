import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { FirebaseApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "../configs/firebaseConfig";
import { useMessage } from "./MessageContext";
import { Context } from "../components/types";

interface AuthContextValue {
  app: FirebaseApp | undefined;
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
  app: undefined,
  currentUser: null,
  loading: true,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [app, setApp] = useState<FirebaseApp>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { addMessage } = useMessage();

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    setApp(app);
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    console.log("Loading....", loading);

    return unsubscribe;
  }, []);

  const signUp = async (email: string, password: string) => {
    setLoading(true);

    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {}

    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    if (currentUser) {
      return;
    }
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {}

    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);

    const auth = getAuth();
    try {
      await fbSignOut(auth);
    } catch (error) {}

    setLoading(false);
  };
  

  return (
    <AuthContext.Provider
      value={{ app, currentUser, loading, signUp, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
