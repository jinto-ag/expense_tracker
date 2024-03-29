import { Navigate, Route, Routes as RouterRoutes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import SignIn from "./pages/authentication/signin";
import SignUp from "./pages/authentication/signup";
import NotFound from "./pages/error/NotFound";
import ExpenseForm from "./pages/expense/expenseForm";
import ExpenseList from "./pages/expense/expenseList";
import ExpenseDetail from "./pages/expense/expenseDetail";

const Routes = () => {
  const { currentUser } = useAuth();
  return (
    <RouterRoutes>
      <Route
        index
        path="/*"
        element={
          currentUser ? (
            <ProtectedRoute>
              <RouterRoutes>
                <Route path="/expenses">
                  <Route index element={<ExpenseList />} />
                  <Route path="new" element={<ExpenseForm />} />
                  <Route path=":id" element={<ExpenseDetail />} />
                  <Route path=":id/edit" element={<ExpenseForm />} />
                </Route>
              </RouterRoutes>
            </ProtectedRoute>
          ) : (
            <Navigate to="/signin" />
          )
        }
      />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="*" element={<NotFound />} />
    </RouterRoutes>
  );
};

export default Routes;
