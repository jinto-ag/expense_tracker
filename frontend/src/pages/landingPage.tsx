import React from "react";
import Image from "react-bootstrap/esm/Image";
import Stack from "react-bootstrap/esm/Stack";
import Logo from "../assets/logo.svg";

interface Props {}

const LandingPage: React.FC<Props> = (props) => {
  return (
    <Stack className="col-md-5 mx-auto justify-content-center">
      <Image src={Logo} />
    </Stack>
  );
};

export default LandingPage;
