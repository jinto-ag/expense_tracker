import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import Form from "../components/Form";
import Logo from "../assets/logo.svg";
import {
  Button as ButtonType,
  FormField,
  Context,
  ButtonTypes,
} from "../components/types";

const Login = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e);
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
  ];

  const buttons: ButtonType[] = [
    {
      label: "Login",
      type: ButtonTypes.SUBMIT,
      context: Context.PRIMARY,
    },
    {
      label: "Sign up",
      type: ButtonTypes.BUTTON,
      context: Context.SECONDARY,
    },
  ];

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col lg="6">
          <Stack
            gap={3}
            className="align-items-center justify-content-center w-100"
          >
            <Image src={Logo} alt="Logo" width="150px" />
            <Form fields={fields} buttons={buttons} onSubmit={submitHandler} />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
