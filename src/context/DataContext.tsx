// DataContext.tsx
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  onValue,
  push,
  off,
  set,
  remove,
  Database,
} from "firebase/database";
import { firebaseConfig } from "../configs/firebaseConfig";
import { useAuth } from "./AuthContext";

interface DataContextValue {
  data: any; // define the shape of your data here
  setData: (data: any) => void;
  createData: (data: any) => void;
  updateData: (id: string, data: any) => void;
  deleteData: (id: string) => void;
}

const DataContext = React.createContext<DataContextValue | undefined>(
  undefined
);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<any>(null);
  const [db, setDb] = useState<Database | undefined>();
  const { app } = useAuth();

  React.useEffect(() => {
    app && setDb(getDatabase(app));
    if (db) {
      const dataRef = ref(db, "data");
      const unsubscribe = onValue(dataRef, (snapshot) => {
        setData(snapshot.val());
      });
      return () => {
        unsubscribe();
      };
    }
  }, []);

  const createData = (data: any) => {
    db && push(ref(db, "data"), data);
  };

  const updateData = (id: string, data: any) => {
    db && set(ref(db, `data/${id}`), data);
  };

  const deleteData = (id: string) => {
    db && remove(ref(db, `data/${id}`));
  };

  return (
    <DataContext.Provider
      value={{ data, setData, createData, updateData, deleteData }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = React.useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
