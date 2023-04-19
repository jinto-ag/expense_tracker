import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import Button from "../../components/styled/Button";
import styles from "./NotFound.module.css";

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFoundPage}>
      <Image src={logo} width={"100px"} />
      <h1 className={styles.heading}>404</h1>
      <h4 className={styles.message}>Page Not Found!</h4>
      <Link to={"/"}>
        <Button variant="primary">Go home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
