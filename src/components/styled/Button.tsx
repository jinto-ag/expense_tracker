import React from "react";
import { Button as RBButton } from "react-bootstrap";
import styles from "./Button.module.css";

const Button: React.FC<React.ComponentProps<typeof RBButton>> = (props) => {
  return <RBButton className={styles.btn} {...props} />;
};

export default Button;
