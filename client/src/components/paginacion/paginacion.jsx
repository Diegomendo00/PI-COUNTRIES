import React from "react";
import "./paginacion.css";

export default function paginado({ countriesPage, allCountries, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="pag">
      <div>
        <ul className="pagination">
          {pageNumber &&
            pageNumber.map((number) => (
              <li className="pagination" key={number}>
                <a onClick={() => paginado(number)}>{number}</a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
