import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import Logo from "../assets/logo.svg";
import Form from "../components/Form";
import {
  Button as ButtonType,
  ButtonTypes,
  Context,
  FormField,
} from "../components/types";

const Login = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        alert("You are signed in.")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };
  const fields: FormField[] = [
    {
      label: "Email",
      type: "email",
      isFloatingLabel: true,
      required: true,
      placeholder: "name@example.com",
      name:"email"
    },
    {
      label: "Password",
      type: "password",
      isFloatingLabel: true,
      required: true,
      placeholder: "password",
      name:"password"
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
