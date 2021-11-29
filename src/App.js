import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Movies from "./components/movies/movies";
import MovieDetail from "./components/movieDetail/MovieDetail";
import Header from "./components/header/Header";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Logout from "./components/logout/Logout";
import Favorites from "./components/favorites/Favorites";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

// import "./App.css";
require("dotenv").config();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwtToken");
    if (jwtToken) {
      let decodedToken = jwt_decode(jwtToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        window.localStorage.removeItem("jwtToken");
        setUser(null);
      } else {
        setUser({
          email: decodedToken.email,
          username: decodedToken.username,
          name: decodedToken.name,
        });
      }
    }
  }, []);

  return (
    <div className="App">
      <ToastContainer theme="colored" />
      <Router>
        <Header user={user} />
        <Routes>
          <Route
            exact
            path="/fetch-movie/:imdbID"
            element={<MovieDetail user={user} />}
          />
          <Route exact path="/" element={<Movies />} />
          <Route exact path="/sign-up" element={<Signup />} />
          <Route exact path="/sign-in" element={<Signin setUser={setUser} />} />
          <Route exact path="/logout" element={<Logout setUser={setUser} />} />
          <Route exact path="/get-all-favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
