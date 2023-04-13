import React, { useState, useEffect } from "react";
import Image from "react-bootstrap/esm/Image";
import Stack from "react-bootstrap/esm/Stack";
import Logo from "../assets/logo.svg";
import { useAuth } from "../context/AuthContext";
import Login from "./login";

interface Props {}

const LandingPage: React.FC<Props> = (props) => {
  const { currentUser } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setTimeout(() => setShowLogin(true), 3000); // 3 seconds delay
    }
  }, [currentUser]);

  return currentUser ? (
    <Stack className="col-md-5 mx-auto justify-content-center">
      <Image src={Logo} />
    </Stack>
  ) : showLogin ? (
    <Login />
  ) : null;
};

export default LandingPage;