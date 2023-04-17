// DataContext.tsx
import React from "react";
import { initializeApp } from 'firebase/app';
import {
  getDatabase,
  ref,
  onValue,
  push,
  off,
  set,
  remove,
} from 'firebase/database';
import { firebaseConfig } from "../configs/firebaseConfig";

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

  // initialize Firebase app
   // initialize Firebase app
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // use Firebase to fetch and manage data here
  React.useEffect(() => {
    const dataRef = ref(db, 'data');
    const unsubscribe = onValue(dataRef, (snapshot) => {
      setData(snapshot.val());
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const createData = (data: any) => {
    push(ref(db, 'data'), data);
  };

 const updateData = (id: string, data: any) => {
    set(ref(db, `data/${id}`), data);
  };

  const deleteData = (id: string) => {
    remove(ref(db, `data/${id}`));
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
