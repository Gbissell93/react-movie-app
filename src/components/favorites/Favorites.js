import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../movies/movie.css";
export default function Favorites() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let jwtToken = window.localStorage.getItem("jwtToken");
    const config = {
      headers: { Authorization: `Bearer ${jwtToken}` },
    };

    axios
      .get("http://localhost:3001/api/movies/my-favorites", config)
      .then((result) => setData(result.data.payload))
      .catch(console.error);
  }, []);

  return (
    console.log(data),
    (
      <>
        <div className="results-container">
          {data.map((movie, index) => (
            <Link to={`/fetch-movie/${movie.imdbLink.slice(22)}`} key={index}>
              <div className="image__container">
                <img
                  className="image__img"
                  src={movie.poster}
                  alt="Movie Poster"
                />
                <div className="image__overlay">
                  <span id="image__title">{movie.title}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </>
    )
  );
}
