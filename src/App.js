import IncomeExpenseForm from "./pages/IncomeExpenseForm";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Income from "./pages/Income";
import Expense from "./pages/Expense";
import Savings from "./pages/Savings";
import Header from "./Component/Header";
import Report from "./pages/Report";

export default function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/income" element={<Income />} />
            <Route path="/expenses" element={<Expense />} />
            <Route path="/savings" element={<Savings />} />
            <Route path="/" element={<IncomeExpenseForm />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}
