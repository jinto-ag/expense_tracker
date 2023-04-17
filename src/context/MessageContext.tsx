import React, { useState } from "react";

interface MessageContextValue {
  // define the shape of your message data here
  messages: string[];
  setMessages: (messages: string[]) => void;
}

const MessageContext = React.createContext<MessageContextValue | undefined>(
  undefined
);

type MessageProviderProps = {
  children: React.ReactNode;
};

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
}) => {
  // use Firebase to fetch and manage message data her
  const [messages, setMessages] = useState<string[]>([]);

  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = React.useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
