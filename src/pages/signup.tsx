import { useState } from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Logo from "../assets/logo.svg";

const SignUp = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(false);
    }
    setValidated(true);
  };
  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col lg="6">
          <Stack gap={2} className="align-items-center justify-content-center">
            <Image src={Logo} alt="Logo" width="33%" />
            <Form noValidate validated={validated} onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingInput" label="Email address">
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">Please enter a username!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">Password can not be blank!</Form.Control.Feedback>
              </Form.Group>

              <Stack gap={2}>
                <Button variant="primary" type="submit">
                  Signup
                </Button>
                <Button variant="secondary" as="a">
                  Login
                </Button>
              </Stack>
            </Form>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
