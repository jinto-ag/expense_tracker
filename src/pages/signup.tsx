import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import Logo from "../assets/logo.svg";
import Form from "../components/Form";
import { Button, ButtonTypes, Context, FormField } from "../components/types";

const SignUp = () => {
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    const form = e.currentTarget;

    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
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
