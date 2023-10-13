import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchExpenses, fetchIncome } from "../actions";
import "../styles.css";

function FinanceReport({ report, type }) {
  return (
    <div>
      {type === "income Vs Expenses" && (
        <div className="report-board">
          <h3> Report</h3>
          <div className="list-items">
            <div className="description">
              <p>Total Income:</p>
              <p>Total Expenses:</p>
              <p>Total Savings:</p>
            </div>
            <div className="amount">
              <p> ${report.totalIncome}</p>
              <p>${report.totalExpenses}</p>
              <p>${report.totalSavings}</p>
            </div>
          </div>
        </div>
      )}
      {type === "expenseBreakdown" && (
        <div className="report-board">
          <h4>Expense Breakdown:</h4>
          <ul>
            {Object.keys(report.expenseBreakdown).map((category, index) => (
              <li key={index}>
                <div className="list-items">
                  <div className="description">
                    <p>{category}:</p>
                  </div>
                  <div className="amount">
                    <p> ${report.expenseBreakdown[category]}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Report() {
  const [reportType, setReportType] = useState("");
  const [report, setReport] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    totalSavings: 0,
    expenseBreakdown: {}
  });
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses);
  const incomes = useSelector((state) => state.income);
  const generateTotal = (arr) => {
    return arr.reduce((acc, curr) => curr.amount + acc, 0);
  };
  const totalExpenses = generateTotal(expenses);
  const totalIncome = generateTotal(incomes);

  const generateReportFunc = () => {
    if (reportType === "income Vs Expenses") {
      const totalSavings = totalIncome - totalExpenses;
      setReport((prev) => ({
        ...prev,
        totalIncome,
        totalExpenses,
        totalSavings
      }));
    } else {
      const expenseBreakdown = {};
      expenses.forEach((transaction) => {
        const { category, amount } = transaction;
        if (expenseBreakdown[category]) {
          expenseBreakdown[category] += amount;
        } else {
          expenseBreakdown[category] = amount;
        }
      });

      setReport((prev) => ({
        ...prev,
        expenseBreakdown
      }));
    }
  };
  useEffect(() => {
    dispatch(fetchExpenses());
    dispatch(fetchIncome());
  }, [dispatch]);
  return (
    <div className="report-container">
      <h2>Financial Reports</h2>
      <div className="report-options">
        <label>Select Report Type:</label>
        <select
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">Select a report type</option>
          <option value="income Vs Expenses">Income vs. Expenses</option>
          <option value="expenseBreakdown">Expense Breakdown</option>
        </select>
        <button onClick={generateReportFunc}>Generate Report</button>
      </div>

      {report.totalIncome > 0 ||
      Object.keys(report.expenseBreakdown).length > 0 ? (
        <FinanceReport report={report} type={reportType} />
      ) : null}
    </div>
  );
}
