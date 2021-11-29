import React from "react";
import "./Search.css";
export default function Search(props) {
  return (
    <div className="search">
      <input
        name="search"
        value={props.value}
        placeholder="Search"
        autoComplete="off"
        onChange={(event) => props.setSearchValue(event.target.value)}
      />
      <br />
    </div>
  );
}
