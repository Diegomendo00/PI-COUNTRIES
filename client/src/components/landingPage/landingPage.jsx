import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
export default function landingPage() {
  return (
    <div className="intro">
      <h1>Bienvenidos a Countries Traveling</h1>
      <Link to="/home">
        <button className="btn">Ingresar</button>
      </Link>
    </div>
  );
}
