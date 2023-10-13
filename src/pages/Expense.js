import React, { useEffect, useState } from "react";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchExpenses } from "../actions";
import CircularProgress from "@mui/material/CircularProgress";

function Expense() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [sortedExpenses, setSortedExpenses] = useState(expenses);
  const [isHighToLow, setIsHighToLow] = useState(false);
  const [isLowToHigh, setIsLowToHigh] = useState(false);

  const totalExpenses = expenses.reduce((acc, value) => value.amount + acc, 0);

  const uniqueCategories = expenses.reduce((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    if (selectedCategory === "All") {
      setSortedExpenses(expenses);
    } else {
      const filteredExpenses = expenses.filter(
        (expense) => expense.category === selectedCategory
      );
      setSortedExpenses(filteredExpenses);
    }
  };

  const convertDate = (date) => {
    const timeStamp = new Date(date);
    const newTime = timeStamp.toDateString();
    return newTime;
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchExpenses());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (isHighToLow) {
      setSortedExpenses([...expenses].sort((a, b) => b.amount - a.amount));
    } else if (isLowToHigh) {
      setSortedExpenses([...expenses].sort((a, b) => a.amount - b.amount));
    } else {
      setSortedExpenses(expenses);
    }
  }, [isHighToLow, isLowToHigh, expenses]);

  return (
    <div>
      <div>
        <h1>Expense Page</h1>
        {loading && (
          <div className="loader">
            <CircularProgress />
            <h3>Loading...</h3>
          </div>
        )}
        <fieldset
          style={{
            margin: "1rem 0",
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <legend>Filters</legend>
          <label>
            <input
              type="checkbox"
              checked={isHighToLow}
              onChange={() => {
                setIsHighToLow(!isHighToLow);
                setIsLowToHigh(false);
              }}
            />
            High to Low
          </label>
          <label>
            <input
              type="checkbox"
              checked={isLowToHigh}
              onChange={() => {
                setIsLowToHigh(!isLowToHigh);
                setIsHighToLow(false);
              }}
            />
            Low to High
          </label>
          <select
            id="category-select"
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="All">All Categories</option>
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </fieldset>
        <div className="container">
          <ol className="list">
            <div className="board">
              <h2>Expense Board</h2>
              <h3>Total Expenses: ${totalExpenses}</h3>
            </div>
            <div className="list-container">
              {sortedExpenses.map((transaction, index) => (
                <li key={index}>
                  <div className="list-items">
                    <div className="description">
                      <p>{transaction.description}</p>
                      <p>{transaction.category}</p>
                    </div>
                    <div className="amount">
                      <p>${transaction.amount}</p>
                      <p>{convertDate(transaction.date)}</p>
                    </div>
                  </div>
                </li>
              ))}
            </div>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default Expense;
