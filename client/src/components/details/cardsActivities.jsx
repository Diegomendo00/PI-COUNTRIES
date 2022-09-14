import React from "react";

export default function CardActivities({ name, difficulty, duration, season }) {
  console.log("seasonCardd", season);
  return (
    <div>
      <h2>Actividad: {name}</h2>
      <h2>Dificultad: {difficulty}</h2>
      <h2>Duracion: {duration} Hrs</h2>
      <h2>Temporada: {season}</h2>
    </div>
  );
}
