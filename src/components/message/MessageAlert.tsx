import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { Message } from "../types";
import styles from "./MessageAlert.module.css";

interface MessageAlertProps {
  messages: Message[];
}

const MessageAlert: React.FC<MessageAlertProps> = ({ messages }) => {
  const [show, setShow] = useState(true);

  return (
    <div className={styles.messageContainer}>
      {messages.map((message, index) => (
        <Alert
          key={index}
          variant={message.type}
          show={show}
          onClose={() => setShow(false)}
          dismissible
        >
          {message.text}
        </Alert>
      ))}
    </div>
  );
};

export default MessageAlert;
