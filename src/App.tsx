import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import "./App.css";
import LandingPage from "./pages/landingPage";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./services/firebaseConfig";

const App = () => {
  const app = initializeApp(firebaseConfig);
  return (
    <Container fluid className="App">
      {/* <LandingPage /> */}
      <Login />
      {/* <SignUp /> */}
    </Container>
  );
};

export default App;
