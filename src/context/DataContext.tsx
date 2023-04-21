import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  get
} from "firebase/database";
import React from "react";
import { useAuth } from "./AuthContext";

interface DataContextValue {
  data: Record<string, any>;
  createData: (key: string, data: any) => Promise<any>;
  getData: (key: string, id: string) => Promise<any>;
  getListOfData: (key: string) => Promise<any>;
  updateData: (key: string, id: string, data: any) => Promise<any>;
  deleteData: (key: string, id: string) => Promise<any>;
}

const DataContext = React.createContext<DataContextValue | undefined>(
  undefined
);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = React.useState<Record<string, any>>({});
  const { app } = useAuth();
  const db = app && getDatabase(app);

  React.useEffect(() => {
    if (db) {
      const locations = ["expenses", "activities", "teams", "profiles"];
      const unsubscribes = locations.map((location) => {
        const dataRef = ref(db, location);
        return onValue(dataRef, (snapshot) => {
          setData((prevData) => ({
            ...prevData,
            [location]: snapshot.val(),
          }));
        });
      });
      return () => {
        unsubscribes.forEach((unsubscribe) => unsubscribe());
      };
    }
  }, [db]);

  const createData = async (key: string, data: any) => {
    if (db) {
      const result = await push(ref(db, key), data);
      return result;
    }
    return null;
  };

  const getData = async (key: string, id: string) => {
    if (db) {
      const result = await get(ref(db, `${key}/${id}`));
      return result.val();
    }
    return null;
  };

  const getListOfData = async (key: string) => {
    if (db) {
      const result = await get(ref(db, `${key}`));
      return result.val();
    }
    return null;
  };

  const updateData = async (key: string, id: string, data: any) => {
    if (db) {
      await set(ref(db, `${key}/${id}`), data);
    }
  };

  const deleteData = async (key: string, id: string) => {
    if (db) {
      await remove(ref(db, `${key}/${id}`));
    }
  };

  return (
    <DataContext.Provider
      value={{ data, createData, getData, getListOfData, updateData, deleteData }}
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