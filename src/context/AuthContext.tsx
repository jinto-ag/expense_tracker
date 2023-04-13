import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

interface AuthContextValue {
  currentUser: User | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
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
    const auth = getAuth();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Sign-in successful.
    } catch (error) {
      // An error happened.
    }
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Sign-out successful.
    } catch (error) {
      // An error happened.
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);