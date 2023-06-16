import React, { useState } from "react";
import "./order.css";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const [subTotal, setSubTotal] = useState("");
  const navigate = useNavigate();
  const handleSubTotalChange = (event) => {
    setSubTotal(event.target.value);
  };

  const handleMyOrderClick = () => {
    navigate("/orderlist");
  };
  const token = localStorage.getItem("user_token");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("token", subTotal);

    const orderData = {
      sub_total: subTotal,
    };

    fetch("https://comfortable-cow-purse.cyclic.app/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Order Added Succesfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="order-container">
      <button className="my-order-button" onClick={handleMyOrderClick}>
        My Orders
      </button>

      <form onSubmit={handleSubmit}>
        <h2>Create Your Order Here</h2>
        <label htmlFor="subTotal">Sub Total:</label>
        <input
          type="number"
          id="subTotal"
          value={subTotal}
          onChange={handleSubTotalChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Order;
