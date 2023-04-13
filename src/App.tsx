import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import "./App.css";
import LandingPage from "./pages/landingPage";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./services/firebaseConfig";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  const app = initializeApp(firebaseConfig);
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
