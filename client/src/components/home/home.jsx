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

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPage, setCountriesPage] = useState(10);
  const indexLastCountry = currentPage * countriesPage;
  const indexFirstCountry = indexLastCountry - countriesPage;
  const currentCountries = allCountries.slice(
    indexFirstCountry,
    indexLastCountry
  );
  const activities = useSelector((state) => state.activities);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getCountries());
    dispatch(getActivities());
  }, [dispatch]);

  function handleFilterByContinent(e) {
    dispatch(countriesByContinent(e.target.value));
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
  }
  return (
    <div>
      <Link to="/activities"> Crear Actividad</Link>
      <h1>Countries API</h1>
      <div>
        <label>Orden Alfabético</label>
        <select onChange={(e) => handleSortName(e)}>
          <option>seleccionar</option>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <label>Cantidad de habitantes</label>
        <select onChange={(e) => handleSortPopulation(e)}>
          <option>seleccionar</option>
          <option value="max">Población máxima</option>
          <option value="min">Población minima</option>
        </select>
        <label>Actividades</label>
        <select onChange={(e) => handleActivities(e)}>
          <option>Seleccionar</option>
          {activities.map((act) => (
            <option value={act.name}>{act.name}</option>
          ))}
        </select>

        <label>Continente</label>
        <select onChange={(e) => handleFilterByContinent(e)}>
          <option>seleccionar</option>
          <option value="Africa">Africa</option>
          <option value="Antarctica">Antarctica</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="North America">North America</option>
          <option value="Oceania">Oceania</option>
          <option value="South America">South America</option>
          <option value="All">Todos los paises</option>
        </select>
        <Paginacion
          countriesPage={countriesPage}
          allCountries={allCountries.length}
          paginado={paginado}
        />
        <SearchBar />
        {currentCountries?.map((e) => {
          return (
            <div className="paises" key={e.id}>
              <Link to={`/countries/${e.id}`}>{e.name}</Link>
              <Card name="" image={e.image} continent={e.continent} id={e.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
