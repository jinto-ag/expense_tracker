import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import "./App.css";
import LandingPage from "./pages/landingPage";
import Login from "./pages/login";

const App = () => {
  return (
    <Container fluid className="App">
      {/* <LandingPage /> */}
      <Login />
    </Container>
  );
};

export default App;
