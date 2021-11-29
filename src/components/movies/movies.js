import React, { useState, useEffect } from "react";
import axios from "axios";
import "./movie.css";
import { Link } from "react-router-dom";

import Search from "../search/Search";

function Movies() {
  const franchiseArray = [
    "Superman",
    "Lord of the Rings",
    "Batman",
    "Harry Potter",
    "Star Wars",
    "Avengers",
    "Terminator",
  ];
  const franchise =
    franchiseArray[Math.floor(Math.random() * franchiseArray.length)];

  const [moviesArray, setMoviesArray] = useState([]);
  const [searchValue, setSearchValue] = useState(franchise);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMovieData(searchValue);
  }, [searchValue]);

  const fetchMovieData = async (movie) => {
    try {
      if (movie === "") {
        movie = franchise;
      }
      const result = await axios.get(
        `http://www.omdbapi.com/?s=${movie.trim()}&apikey=96779e86&`
      );
      if (result.data.Search === undefined) {
        setMoviesArray([]);
        setError("Movie Not Found");
      } else {
        setError("");
        const randomMovies = result.data.Search;
        const uniqueObjArray = [
          ...new Map(
            randomMovies.map((item) => [item["imdbID"], item])
          ).values(),
        ];
        const ratedMovies = await Promise.all(
          uniqueObjArray.slice(0, 8).map(async (movie) => {
            const result = await axios.get(
              `http://omdbapi.com/?i=${movie.imdbID}&apikey=ef773fae&`
            );
            movie.rating = result.data.imdbRating;
            if (movie.Poster === "N/A") {
              movie.Poster = "poster";
            }
            return movie;
          })
        );
        setMoviesArray(ratedMovies);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <br />
      <span id="error">{error}</span>
      <div className="results-container">
        {moviesArray.map((movie, index) => (
          <Link to={`/fetch-movie/${movie.imdbID}`} key={index}>
            <div className="image__container">
              <img
                className="image__img"
                src={movie.Poster}
                alt="Movie Poster"
              />
              <div className="image__overlay">
                <span id="image__title">{movie.Title}</span>
                <div id="rating__container">
                  <span id="image__rating">{movie.rating}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default Movies;
