import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      name: name,
      phoneNumber: phoneNumber,
      password: password,
    };

    // if (name === "" || phoneNumber === "" || password === "") {
    //   alert("All Field Is Important");
    // } else {
    //   fetch("https://comfortable-cow-purse.cyclic.app/api/users", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log("data", data);
    //       navigate("/");
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });
    // }
    if (name === "" || phoneNumber === "" || password === "") {
      alert("All Field Is Important");
    } else {
      fetch("https://comfortable-cow-purse.cyclic.app/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            alert("User already exists!")
            throw new Error("User already exists!"); 
            
          }
        })
        .then((data) => {
          console.log("data", data);
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error.message);
          
        });
    }
    
  }

  return (
    <>
      <div className="outer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Sign up</button>
        </form>
      </div>
    </>
  );
};

export default SignupForm;
