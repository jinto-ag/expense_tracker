import React from "react";
import { Image } from "react-bootstrap";
import styles from "./404.module.css";
import logo from "../../assets/logo.svg";
import Button from "../../components/styled/Button";

const NotFoundPage: React.FC = () => {
  const handleGoHome = () => {};

  return (
    <div className={styles.notFoundPage}>
      <Image src={logo} width={"100px"}/>
      <h1>404 - Page Not Found</h1>
      <Button onClick={handleGoHome}>Go Home</Button>
    </div>
  );
};

export default NotFoundPage;
