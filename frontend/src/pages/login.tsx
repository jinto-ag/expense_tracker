import { Image, Stack } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Logo from "../assets/logo.svg";

const Login = () => {
  return (
    <Stack gap={2} className="align-items-center justify-content-center">
      <Image src={Logo} alt="Logo" width="50%" />
      <Form noValidate>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Stack gap={2}>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <Button variant="secondary" as="a">
            Signup
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
};

export default Login;
