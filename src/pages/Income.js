import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIncome } from "../actions";
import { CircularProgress } from "@mui/material";

function Income() {
  const dispatch = useDispatch();
  const income = useSelector((state) => state.income);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [sortedIncome, setSortedIncome] = useState(income);
  const [isHighToLow, setIsHighToLow] = useState(false);
  const [isLowToHigh, setIsLowToHigh] = useState(false);

  const totalIncome = income.reduce((acc, value) => value.amount + acc, 0);

  const uniqueCategories = income.reduce((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    if (selectedCategory === "All") {
      setSortedIncome(savings);
    } else {
      const filteredIncome = income.filter(
        (data) => data.category === selectedCategory
      );
      setSortedIncome(filteredIncome);
    }
  };

  const convertDate = (date) => {
    const timeStamp = new Date(date);
    const newTime = timeStamp.toDateString();
    return newTime;
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchIncome());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (isHighToLow) {
      setSortedIncome([...income].sort((a, b) => b.amount - a.amount));
    } else if (isLowToHigh) {
      setSortedIncome([...income].sort((a, b) => a.amount - b.amount));
    } else {
      setSortedIncome(income);
    }
  }, [isHighToLow, isLowToHigh, income]);
  return (
    <div>
      <div>
        <h1>Income Page</h1>
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
              <h2>Income Board</h2>
              <h3>Total Income: ${totalIncome}</h3>
            </div>
            <div className="list-container">
              {sortedIncome.map((income, index) => (
                <li key={index}>
                  <div className="list-items">
                    <div className="description">
                      <p>{income.description}</p>
                      <p>{income.category}</p>
                    </div>
                    <div className="amount">
                      <p>${income.amount}</p>
                      <p>{convertDate(income.date)}</p>
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

export default Income;
