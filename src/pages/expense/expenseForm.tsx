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
import { useMessage } from "../../context/MessageContext";
import { useData } from "../../context/DataContext";
import { Expense } from "../../services/data.type";
import * as yup from "yup";

interface LocationState {
  from: {
    pathname: string;
  };
}

const expenseSchema = yup.object().shape({
  
})

const ExpenseForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state: LocationState };
  const { currentUser, loading } = useAuth();
  const { addMessage } = useMessage();
  const { createData } = useData();

  useEffect(() => {
    if (!loading) {
    }
  }, [currentUser, loading]);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const expense = Object.fromEntries(formData.entries());

    try {
      await createData("expenses", expense);
      addMessage({
        text: "Expense added successfully!",
        type: Context.SUCCESS,
        autoClose: true,
        timeout: 3000,
      });
    } catch (error) {
      addMessage({
        text: `Expense adding failed! ${error}`,
        type: Context.DANGER,
        autoClose: false,
      });
    }
  };
  const fields: FormField[] = [
    {
      label: "Name of the Expense",
      type: "text",
      isFloatingLabel: true,
      required: true,
      placeholder: "Name of the Expense",
      name: "name",
    },
    {
      label: "Expense category",
      type: "text",
      isFloatingLabel: true,
      required: true,
      placeholder: "Expense category",
      name: "category",
    },
    {
      label: "What is the total amount?",
      type: "text",
      isFloatingLabel: true,
      required: true,
      placeholder: "What is the total amount?",
      name: "total_amount",
    },
    {
      label: "How much amount you paid?",
      type: "text",
      isFloatingLabel: true,
      required: true,
      placeholder: "How much amount you paid?",
      name: "amount_paid",
    },
    {
      label: "Which is your team?",
      type: "text",
      isFloatingLabel: true,
      required: true,
      placeholder: "Which is your team?",
      name: "category",
    },
    {
      label: "Date",
      type: "date",
      isFloatingLabel: true,
      required: true,
      placeholder: "Date",
      name: "date",
    },
    {
      label: "Remarks(if any)",
      type: "text",
      isFloatingLabel: true,
      required: true,
      placeholder: "Remarks(if any)",
      name: "remarks",
    },
  ];

  const buttons: ButtonType[] = [
    {
      label: "Add Expense",
      type: ButtonTypes.SUBMIT,
      context: Context.PRIMARY,
    },
  ];

  return (
    <Container className="py-3">
      <Row className="justify-content-center align-items-center h-100">
        <Col lg="6">
          <Stack
            gap={3}
            className="align-items-center justify-content-center px-3 w-100"
          >
            <Form fields={fields} buttons={buttons} onSubmit={submitHandler} />
            <Link to="/signup" className="w-100">
              <Button variant="secondary" className="w-100">
                Expense List
              </Button>
            </Link>
          </Stack>
        </Col>
      </Row>
    </Container>
  );
};

export default ExpenseForm;
