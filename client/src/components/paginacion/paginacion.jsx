import React from "react";

export default function paginado({ countriesPage, allCountries, paginado }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(allCountries / countriesPage); i++) {
    pageNumber.push(i);
  }
  return (
    <nav>
      <ul>
        {pageNumber &&
          pageNumber.map((number) => (
            <a key={number} onClick={() => paginado(number)}>
              {number}
            </a>
          ))}
      </ul>
    </nav>
  );
}
