import React from "react";
import { Image } from "react-bootstrap";
import styles from "./NotFound.module.css";
import logo from "../../assets/logo.svg";
import Button from "../../components/styled/Button";

const NotFound: React.FC = () => {
  const handleGoHome = () => {};

  return (
    <div className={styles.notFoundPage}>
      <Image src={logo} width={"100px"}/>
      <h1>404 - Page Not Found</h1>
      <Button onClick={handleGoHome}>Go Home</Button>
    </div>
  );
};

export default NotFound;
