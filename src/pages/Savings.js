import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavings } from "../actions";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles.css";

function Savings() {
  const dispatch = useDispatch();
  const savings = useSelector((state) => state.savings);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [sortedSavings, setSortedSavings] = useState(savings);
  const [isHighToLow, setIsHighToLow] = useState(false);
  const [isLowToHigh, setIsLowToHigh] = useState(false);

  const totalSavings = savings.reduce((acc, value) => value.amount + acc, 0);

  const uniqueCategories = savings.reduce((categories, item) => {
    if (!categories.includes(item.category)) {
      categories.push(item.category);
    }
    return categories;
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    if (selectedCategory === "All") {
      setSortedSavings(savings);
    } else {
      const filteredSavings = savings.filter(
        (saving) => saving.category === selectedCategory
      );
      setSortedSavings(filteredSavings);
    }
  };

  const convertDate = (date) => {
    const timeStamp = new Date(date);
    const newTime = timeStamp.toDateString();
    return newTime;
  };

  useEffect(() => {
    setLoading(true);
    dispatch(fetchSavings());
    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (isHighToLow) {
      setSortedSavings([...savings].sort((a, b) => b.amount - a.amount));
    } else if (isLowToHigh) {
      setSortedSavings([...savings].sort((a, b) => a.amount - b.amount));
    } else {
      setSortedSavings(savings);
    }
  }, [isHighToLow, isLowToHigh, savings]);

  return (
    <div>
      <div>
        <h1>Saving Page</h1>
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
              <h2>Saving Board</h2>
              <h3>Total Savings: ${totalSavings}</h3>
            </div>
            <div className="list-container">
              {sortedSavings.map((saving, index) => (
                <li key={index}>
                  <div className="list-items">
                    <div className="description">
                      <p>{saving.description}</p>
                      <p>{saving.category}</p>
                    </div>
                    <div className="amount">
                      <p>${saving.amount}</p>
                      <p>{convertDate(saving.date)}</p>
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

export default Savings;
