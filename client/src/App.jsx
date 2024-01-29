import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/DashboardPage";
import SnackbarComponent from "./components/helper/SnackbarComponent";
import DialogComponent from "./components/helper/DialogComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <SnackbarComponent />
        <DialogComponent />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/lot" element={<DashboardPage />} />
          <Route path="/add-lot" element={<DashboardPage />} />
          <Route path="/lot/:lotId" element={<DashboardPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
