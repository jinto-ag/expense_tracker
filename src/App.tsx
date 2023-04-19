import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/esm/Container";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./Routes";
import NavigationBar from "./components/navbar/NavigationBar";
import { useAuth } from "./context/AuthContext";
import { useEffect } from "react";
import Loader from "./components/Loader";
import MessageAlert from "./components/message/MessageAlert";
import { useMessage } from "./context/MessageContext";

const App = () => {
  const { currentUser, loading } = useAuth();
  const { messages } = useMessage();

  useEffect(() => {
    if (!loading && currentUser) {
    }
  }, [currentUser, loading]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Router>
      <MessageAlert messages={messages} />
      <Container fluid className="App">
        {currentUser && <NavigationBar />}
        <Routes />
      </Container>
    </Router>
  );
};

export default App;
