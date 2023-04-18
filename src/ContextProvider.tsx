import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/MessageContext";
import { ThemeProvider } from "./context/ThemeContext";
import { DataProvider } from "./context/DataContext";

interface ContextProviderProps {
  children: React.ReactNode;
}

const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => (
  <AuthProvider>
    <ThemeProvider>
      <DataProvider>
        <MessageProvider>{children}</MessageProvider>
      </DataProvider>
    </ThemeProvider>
  </AuthProvider>
);

export default ContextProvider;
