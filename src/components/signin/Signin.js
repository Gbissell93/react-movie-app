import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
// import "../signup/Signup.css";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function Signin({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const payload = await axios.post("http://localhost:3001/api/user/login", {
        email,
        password,
      });
      window.localStorage.setItem("jwtToken", payload.data.payload);
      const decodedToken = jwt_decode(payload.data.payload);
      setUser({
        email: decodedToken.email,
        username: decodedToken.username,
        name: decodedToken.name,
      });
      navigate("/");
    } catch (e) {
      toast.error(e.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }
  return (
    <div className="center-div-container">
      <div className="center-div-signin">
        <div class="login-wrapper">
          <h1 className="Signin__title__text">SIGN IN</h1>
          <form id="login" onSubmit={handleSubmit}>
            <input
              autofocus
              class="email"
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <input
              class="password"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button id="sign__button">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
}
