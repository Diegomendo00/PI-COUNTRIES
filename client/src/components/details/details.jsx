import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails } from "../../Actions";
import CardsActivities from "./cardsActivities";

export default function Details() {
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(getDetails(id));
  });

  const countries = useSelector((state) => state.details);

  const number = (x) => {
    if (typeof x === "number") {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
  };

  return (
    <div>
      {countries && countries.id ? (
        <div>
          <h1>{countries.name}</h1>
          <img src={countries.image} alt="" />
          <h2>Id: {countries.id}</h2>
          <h2>Continente: {countries.continent}</h2>
          <h2>Capital: {countries.capital}</h2>
          <h2>Subregión: {countries.subregion}</h2>
          <h2>Área: {number(countries.area)} km2</h2>
          <h2>Población: {number(countries.population)} hab. Aprox.</h2>

          <div>
            {countries.activities.map((el) => {
              return (
                <div key={el.id}>
                  <CardsActivities
                    name={el.name}
                    difficulty={el.difficulty}
                    duration={el.duration}
                    temporada={el.season}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
