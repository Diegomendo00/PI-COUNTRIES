import React from "react";
import "./card.css";

export default function Card({ name, image, continent, id }) {
  return (
    <div className="pais">
      <div className="card">
        <h3>{name.toUpperCase()}</h3>
        <h3>{continent}</h3>
        <img
          className="img"
          src={image}
          alt="imagen no encontrada"
          width="200px"
          height="150px"
        />
      </div>
    </div>
  );
}
