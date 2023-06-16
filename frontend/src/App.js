import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignupForm from "./pages/signup";
import SigninForm from "./pages/login";
import Order from "./pages/order";
import OrderList from "./pages/orderList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<SigninForm />} />
          <Route path="/order" element={<Order />} />
          <Route path="/orderlist" element={<OrderList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
