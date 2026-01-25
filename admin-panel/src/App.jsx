import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import AddProduct from "./pages/AddProduct";
import Categories from "./pages/Categories";

const isAdminLoggedIn = () => {
  return !!localStorage.getItem("admin");
};

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={isAdminLoggedIn() ? <Dashboard /> : <Navigate to="/login" />}
      />

<Route
  path="/categories"
  element={isAdminLoggedIn() ? <Categories /> : <Navigate to="/login" />}
/>

      <Route
        path="/products"
        element={isAdminLoggedIn() ? <Products /> : <Navigate to="/login" />}
      />

      <Route
        path="/orders"
        element={isAdminLoggedIn() ? <Orders /> : <Navigate to="/login" />}
      />

      <Route
        path="/add-product"
        element={isAdminLoggedIn() ? <AddProduct /> : <Navigate to="/login" />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
