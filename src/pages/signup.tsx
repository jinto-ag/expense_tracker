import { useState } from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "../components/Form";
import Logo from "../assets/logo.svg";
import { Button, ButtonTypes, Context, FormField } from "../components/types";

const SignUp = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
  };

  const fields: FormField[] = [
    {
      label: "Email",
      type: "email",
      isFloatingLabel: true,
    },
    {
      label: "Password",
      type: "password",
      isFloatingLabel: true,
    },
    {
      label: "Confirm Password",
      type: "password",
      isFloatingLabel: true,
    },
  ];

  const buttons: Button[] = [
    {
      label: "Sign up",
      type: ButtonTypes.SUBMIT,
      context: Context.PRIMARY,
    },
    {
      label: "Login",
      type: ButtonTypes.BUTTON,
      context: Context.SECONDARY,
    },
  ];

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col lg="6">
          <Stack gap={2} className="align-items-center justify-content-center">
            <Image src={Logo} alt="Logo" width="33%" />
            <Form fields={fields} buttons={buttons} onSubmit={submitHandler} />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
