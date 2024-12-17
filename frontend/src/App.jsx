import { Route, Routes } from "react-router-dom";
import "./App.css";
import VenderDashboard from "./components/dashboard/VenderDashboard";
import Login from "./components/Login/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<VenderDashboard />} />
      </Routes>
    </>
  );
}

export default App;
