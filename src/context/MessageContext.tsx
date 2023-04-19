import React, { useEffect, useState } from "react";
import { Message } from "../components/types";

interface MessageContextValue {
  messages: Message[];
  addMessage: (message: Message) => void;
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
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (message: Message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  useEffect(() => {
    const timeouts = messages.map((message, index) => {
      if (message.autoClose) {
        return setTimeout(() => {
          setMessages((prevMessages) =>
            prevMessages.filter((_, i) => i !== index)
          );
        }, message.timeout || 5000);
      }
      return null;
    });

    return () => {
      timeouts.forEach((timeout) => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [messages]);

  return (
    <MessageContext.Provider value={{ messages, addMessage }}>
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
