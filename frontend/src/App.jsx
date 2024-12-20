import { Route, Routes } from "react-router-dom";
import "./App.css";
import VenderDashboard from "./components/dashboard/VenderDashboard";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Orders from "./components/Products/Orders";
import Home from "./clients/components/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<VenderDashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/client" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
