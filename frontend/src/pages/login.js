import React, { useState } from "react";
import "./signup.css";
import { useNavigate } from "react-router-dom";
import firebase from "./firebase";
const SigninForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const registerUser = (email, name) => {
    console.log("google", email, name);
    const formData = {
      name: name,
      email: email,
    };

    fetch("https://comfortable-cow-purse.cyclic.app/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      
        return response.json();
      
    })
      .then((data) => {
        console.log("data", data);
        navigate("/order");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleGoogleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        console.log("Logged in user:", user);

        registerUser(user.email, user.displayName);
      })
      .catch((error) => {
        console.error("Error logging in with Google:", error);
      });
  };
  const movetosignup = () => {
    navigate("/signup");
  };
  function handleSubmit(event) {
    event.preventDefault();

    const formData = {
      phoneNumber: phoneNumber,
      password: password,
    };

    if (phoneNumber === "" || password === "") {
      alert("All Field Is Important");
    } else {
      fetch("https://comfortable-cow-purse.cyclic.app/api/users/login", {
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
          alert("Invalid phoneNumber or Password!")
          throw new Error("Invalid phoneNumber or Password!"); 
          
        }
      })
        .then((res) => {
          if (res.token) {
            localStorage.setItem("user_token", res.token);
          }
          console.log("data", res);
          navigate("/order");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  return (
    <>
      <div className="outer">
        <form onSubmit={handleSubmit}>
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

          <button type="submit">Signin</button>
        </form>
        <button className="google-button" onClick={handleGoogleLogin}>
          Sign in with Google
        </button>
        <label>if you are new user then create your account </label>
        <button className="google-button" onClick={movetosignup}>
          Create Account
        </button>
      </div>
    </>
  );
};

export default SigninForm;
