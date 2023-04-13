import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import Form from "../components/Form";
import Button from "../components/styled/Button";
import {
  Button as Btn,
  ButtonTypes,
  Context,
  FormField,
} from "../components/types";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const { signUp } = useAuth();
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signUp(email, password);
      // Signed in
      // ...
    } catch (error) {
      // An error happened
      // ...
    }
  };

  const fields: FormField[] = [
    {
      label: "Email",
      type: "email",
      isFloatingLabel: true,
      required: true,
      placeholder: "name@example.com",
      name: "email",
    },
    {
      label: "Password",
      type: "password",
      isFloatingLabel: true,
      required: true,
      placeholder: "password",
      name: "password",
    },
    {
      label: "Confirm Password",
      type: "password",
      isFloatingLabel: true,
      required: true,
      placeholder: "password",
    },
  ];

  const buttons: Btn[] = [
    {
      label: "Sign up",
      type: ButtonTypes.SUBMIT,
      context: Context.PRIMARY,
    },
  ];

  return (
    <Container className="vh-100">
      <Row className="justify-content-center align-items-center h-100">
        <Col lg="6">
          <Stack gap={2} className="align-items-center justify-content-center">
            <Image src={Logo} alt="Logo" width="33%" />
            <Form fields={fields} buttons={buttons} onSubmit={submitHandler} />
            <Link to={"/login"}>
              <Button variant="secondary">Login</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
