import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from "firebase/app";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { firebaseConfig } from "./configs/firebaseConfig";
import Login from "./pages/authentication/signin";
import SignUp from "./pages/authentication/signup";
import Error404 from "./pages/error/404";

const App = () => {
  const app = initializeApp(firebaseConfig);
  return (
    <Container fluid className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
};

export default App;
