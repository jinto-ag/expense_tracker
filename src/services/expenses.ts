import { getDatabase, ref, set, update, remove, push, get } from "firebase/database";
import { Expense } from "./data.type";

const db = getDatabase();
const expensesRef = ref(db, "expenses");

const addExpense = async (expense: Expense) => {
  try {
    const newExpenseRef = push(expensesRef);
    await set(newExpenseRef, expense);
    console.log("Expense added with ID: ", newExpenseRef.key);
  } catch (e) {
    console.error("Error adding expense: ", e);
  }
};

const getExpenses = async () => {
  const snapshot = await get(expensesRef);
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
};

const updateExpense = async (id: string, expense: Partial<Expense>) => {
  try {
    await update(ref(db, `expenses/${id}`), expense);
  } catch (e) {
    console.error("Error updating expense: ", e);
  }
};

const deleteExpense = async (id: string) => {
  try {
    await remove(ref(db, `expenses/${id}`));
  } catch (e) {
    console.error("Error removing expense: ", e);
  }
};