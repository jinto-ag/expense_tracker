import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import SignIn from "./pages/authentication/signin";
import SignUp from "./pages/authentication/signup";
import NotFound from "./pages/error/NotFound";
import ExpenseForm from "./pages/expense/expenseForm";

const Routes = () => {
  const { currentUser } = useAuth();
  return (
    <RouterRoutes>
      <Route
        path="/"
        element={currentUser ? <Navigate to="/protected/expenses" /> : undefined}
      />
      <Route
        index
        path="/protected/*"
        element={
          <ProtectedRoute>
            <RouterRoutes>
              <Route path="/expenses" element={<ExpenseForm />} />
            </RouterRoutes>
          </ProtectedRoute>
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
