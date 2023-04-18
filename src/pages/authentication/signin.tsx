import { useEffect } from "react";
import { Col, Container, Image, Row, Stack } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.svg";
import Form from "../../components/form/Form";
import Button from "../../components/styled/Button";
import {
  Button as ButtonType,
  ButtonTypes,
  Context,
  FormField,
} from "../../components/types";
import { useAuth } from "../../context/AuthContext";
import Loader from "../../components/Loader";

interface LocationState {
  from: {
    pathname: string;
  };
}

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state: LocationState };
  const { signIn, currentUser, loading } = useAuth();

  const redirectUrl = location.state?.from.pathname || "/";
  console.log("Redirect URL: ", redirectUrl);

  useEffect(() => {
    if (!loading && currentUser) {
      navigate(redirectUrl);
    }
  }, [currentUser, navigate, redirectUrl, loading]);

  if (loading) {
    return <Loader />;
  }

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
      navigate(redirectUrl);
    } catch (error) {
      // An error happened
      // ...
      alert(`Error Occured! ${error}`);
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
      label: "Sign In",
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
              <Button variant="secondary">Sign Up</Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
