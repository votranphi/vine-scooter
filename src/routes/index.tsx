import Home from "@/pages/Home";
import ProductDetails from "@/pages/ProductDetails";
import { Routes, Route, Navigate } from "react-router-dom";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/product/:productId" element={<ProductDetails />} />
      <Route path="/" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}