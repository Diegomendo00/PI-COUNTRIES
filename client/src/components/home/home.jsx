import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountries,
  countriesByContinent,
  orderByName,
  orderByPopulation,
  getActivities,
  filterByActivitiy,
} from "../../Actions";
import { Link } from "react-router-dom";
import Card from "../card/card.jsx";
import Paginacion from "../paginacion/paginacion";
import SearchBar from "../searchBar/searchBar";
import "./home.css";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPage, setCountriesPage] = useState(9);
  const indexLastCountry = currentPage * countriesPage;
  const indexFirstCountry = indexLastCountry - countriesPage;
  const currentCountries = allCountries.slice(
    indexFirstCountry,
    indexLastCountry
  );

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  const activities = useSelector((state) => state.activities);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber) !== 1
      ? setCountriesPage(10)
      : setCountriesPage();
  };

  function handleFilterByContinent(e) {
    dispatch(countriesByContinent(e.target.value));
    setCurrentPage(1);
  }
  function handleSortName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenados ${e.target.value}`);
  }

  function handleSortPopulation(e) {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenados ${e.target.value}`);
  }

  function handleActivities(e) {
    e.preventDefault();
    dispatch(filterByActivitiy(e.target.value));
    setCurrentPage(1);
  }
  return (
    <div>
      <div className="caja">
        <h1>Countries Traveling</h1>
        <div>
          <Link to="/activities">
            <button className="btn-crear">Crear Actividad</button>
          </Link>
        </div>
        <p />
        <div className="filtros">
          <div className="ordenar">
            <label>Orden Alfabético</label>

            <select onChange={(e) => handleSortName(e)}>
              <option selected disabled>
                - - - - // - - - -
              </option>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </select>
          </div>
          <div className="ordenar">
            <label>Cantidad de habitantes</label>
            <select onChange={(e) => handleSortPopulation(e)}>
              <option selected disabled>
                - - - - // - - - -
              </option>
              <option value="max">Población máxima</option>
              <option value="min">Población minima</option>
            </select>
          </div>
          <div className="ordenar">
            <label>Actividades</label>
            {activities.length === 0 ? (
              <p>No hay actividades</p>
            ) : (
              <select onChange={(e) => handleActivities(e)}>
                <option value="sin filtro">seleccionar</option>

                {activities.map((e) => {
                  return <option value={e.name}>{e.name}</option>;
                })}
              </select>
            )}
          </div>
          <div className="ordenar">
            <label>Continente</label>
            <select onChange={(e) => handleFilterByContinent(e)}>
              <option value="All">Todos los paises</option>
              <option value="Africa">Africa</option>
              <option value="Antarctica">Antarctica</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="North America">North America</option>
              <option value="Oceania">Oceania</option>
              <option value="South America">South America</option>
            </select>
          </div>
        </div>
        <p />
        <Paginacion
          countriesPage={countriesPage}
          allCountries={allCountries.length}
          paginado={paginado}

        />
        <p />
        <SearchBar setCurrentPage={setCurrentPage} />
        <div className="total">
          {currentCountries?.map((e) => {
            return (
              <div>
                <div className="paises" key={e.id}>
                  <Link className="link" to={`/countries/${e.id}`}>
                    {e.name.toUpperCase()}
                  </Link>
                  <Card
                    name=""
                    image={e.image}
                    continent={e.continent}
                    id={e.id}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
