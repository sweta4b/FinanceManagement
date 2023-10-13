import { useState } from "react";
import { useDispatch } from "react-redux";
import { addEntries } from "../actions";
export default function IncomeExpenseForm() {
  const [input, setInput] = useState({
    amount: "",
    description: "",
    category: "",
    entryType: "",
    date: ""
  });

  const dispatch = useDispatch();

  const handleAddIncome = (e) => {
    e.preventDefault();
    dispatch(addEntries({ ...input, entryType: "income" }));
    setInput({
      amount: "",
      description: "",
      category: "",
      entryType: "income",
      date: ""
    });
  };

  const handleAddSavings = (e) => {
    e.preventDefault();
    dispatch(addEntries({ ...input, entryType: "savings" }));

    setInput({
      amount: "",
      description: "",
      category: "",
      entryType: "savings",
      date: ""
    });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    dispatch(addEntries(input));

    setInput({
      amount: "",
      description: "",
      category: "",
      entryType: "expenses",
      date: ""
    });
  };
  return (
    <div>
      <div className="form-container">
        <h2>Add Your Transactions</h2>
        <form
          className="entry-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="number"
            value={input.amount}
            placeholder="Amount"
            required
            onChange={(e) => {
              setInput({ ...input, amount: e.target.value });
            }}
          />
          <input
            type="text"
            value={input.category}
            placeholder="category"
            onChange={(e) => {
              setInput({ ...input, category: e.target.value });
            }}
          />
          <input
            type="text"
            value={input.description}
            placeholder="description"
            onChange={(e) => {
              setInput({ ...input, description: e.target.value });
            }}
          />
          <input
            type="date"
            value={input.date}
            placeholder="date"
            onChange={(e) => {
              setInput({ ...input, date: e.target.value });
            }}
          />
          <div className="button-container">
            <button onClick={handleAddIncome}>Add Income</button>
            <button className="secondaryBtn" onClick={handleAddExpense}>
              Add Expense
            </button>
            <button onClick={handleAddSavings}>Add Saving</button>
          </div>
        </form>
      </div>
    </div>
  );
}
