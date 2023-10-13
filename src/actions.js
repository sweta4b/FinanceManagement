import { toast } from "react-toastify";

export const fetchIncome = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch("https://finance.sweta4b.repl.co/income");

    const dataRecieved = await response.json();

    dispatch({ type: "FETCH_INCOME_SUCCESS", payload: dataRecieved });
  } catch (error) {
    console.error("Error fetching income data: ", error);
    dispatch({ type: "FETCH_INCOME_FAILURE" });
  }
};
export const fetchExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch("https://finance.sweta4b.repl.co/expenses");
    const dataRecieved = await response.json();

    dispatch({ type: "FETCH_EXPENSES_SUCCESS", payload: dataRecieved });
  } catch (error) {
    console.error("Error fetching income data:", error);
    dispatch({ type: "FETCH_EXPENSE_FAILURE" });
  }
};
export const fetchSavings = () => async (dispatch) => {
  try {
    dispatch({ type: "FETCH_DATA_LOADING" });
    const response = await fetch("https://finance.sweta4b.repl.co/savings");
    const dataRecieved = await response.json();
    dispatch({ type: "FETCH_SAVINGS_SUCCESS", payload: dataRecieved });
  } catch (error) {
    console.error("Error while fetching savings data", error);
    dispatch({ type: "FETCH_SAVINGS_ERROR" });
  }
};
export const addEntries = (entryData) => async (dispatch) => {
  console.log("running addEntries");
  try {
    const param =
      entryData.entryType === "income"
        ? "add-income"
        : entryData.entryType === "savings"
        ? "add-saving"
        : "add-expense";
    const response = await fetch(`https://finance.sweta4b.repl.co/${param}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(entryData)
    });
    const data = await response.json();
    console.log("DATA", data);
    if (data.success === true) {
      if (entryData.entryType === "income")
        dispatch({ type: "ADD_INCOME", payload: data.data });

      if (entryData.entryType === "expense") {
        dispatch({ type: "ADD_EXPENSE", payload: data.data });
      }
    }
    toast.success("Data added to " + param);
  } catch (error) {
    console.error("While adding Data", error);
  }
};
