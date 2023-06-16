import React, { useEffect, useState } from "react";
import "./orderList.css";
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("user_token");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://comfortable-cow-purse.cyclic.app/api/orders/myorders",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setOrders(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="order-list">
      <h1>Order List</h1>
      <div className="order-grid">
        {orders &&
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <h2>Name: {order.name}</h2>
              <p>Phone Number: {order.phoneNumber}</p>
              <p>Subtotal: {order.sub_total}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderList;
