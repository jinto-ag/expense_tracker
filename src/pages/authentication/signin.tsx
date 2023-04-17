import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo.svg";
import Form from "../../components/form/Form";
import { Link } from "react-router-dom";
import {
  Button as ButtonType,
  ButtonTypes,
  Context,
  FormField,
} from "../../components/types";
import Button from "../../components/styled/Button";

const SignIn = () => {
  const { signIn } = useAuth();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn(email, password);
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
  ];

  const buttons: ButtonType[] = [
    {
      label: "SignIn",
      type: ButtonTypes.SUBMIT,
      context: Context.PRIMARY,
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
            <Link to="/signup">
              <Button variant="secondary">Signup</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
