import { Route, Routes } from "react-router-dom";
import "./App.css";
import VenderDashboard from "./components/dashboard/VenderDashboard";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Orders from "./components/Products/Orders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<VenderDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

export default App;
