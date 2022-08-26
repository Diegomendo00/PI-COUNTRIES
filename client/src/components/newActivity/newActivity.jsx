import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getActivities, postActivities } from "../../Actions";
import { useDispatch, useSelector } from "react-redux";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  } else if (/[^A-Za-z]+/g.test(input.name)) {
    errors.name =
      "El nombre no puede contener simbolos, numeros o caracteres especiales";
  }

  if (!input.difficulty) {
    errors.difficulty = "Falta rellenar este campo";
  } else if (input.difficulty <= 0 || input.difficulty > 5) {
    errors.difficulty = "Numero invalido";
  }

  if (!input.duration) {
    errors.duration = "Falta rellenar este campo";
  } else if (input.duration <= 0 || input.duration > 24) {
    errors.duration = "Numero invalido";
  }

  if (!input.season) {
    errors.season = "Elija una temporada";
  }

  if (input.countryName.length === 0) {
    errors.countryName = "Seleccione por lo menos un pais";
  }
  return errors;
}

export default function ActivityCreate() {
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.countries);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    difficulty: "",
    duration: "",
    season: "",
    countryName: [],
  });

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelection(e) {
    setInput({
      ...input,
      countryName: [...input.countryName, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectSeason(e) {
    setInput({
      ...input,
      season: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    let validar = validate(input);
    setErrors(validar);
    if (Object.keys(validar).length > 0) {
      alert("errores");
      return;
    }

    dispatch(postActivities(input));
    alert("Actividad Creada");
    setInput({
      name: "",
      difficulty: "",
      duration: "",
      season: "",
      countryName: [],
    });
  }
  console.log(input);

  function handleDelete(el) {
    setInput({
      ...input,
      countryName: input.countryName.filter((e) => e !== el),
    });
  }

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea una Actividad</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre de la actividad:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Grado de dificultad:</label>
          <input
            type="number"
            name="difficulty"
            value={input.difficulty}
            placeholder="Valor entre 1 y 5..."
            onChange={(e) => handleChange(e)}
          />
          {errors.difficulty && <p>{errors.difficulty}</p>}
        </div>
        <div>
          <label>Tiempo estimado:</label>
          <input
            type="number"
            value={input.duration}
            name="duration"
            onChange={(e) => handleChange(e)}
            placeholder="duracion en horas..."
          />
          {errors.duration && <p>{errors.duration}</p>}
        </div>
        <div>
          <label>Temporada:</label>
          <select onChange={(e) => handleSelectSeason(e)}>
            <option selected disabled>
              Seleccionar
            </option>
            <option value="Primavera">Primavera</option>
            <option value="Verano">Verano</option>
            <option value="Otoño">Otoño</option>
            <option value="Invierno">Invierno</option>
          </select>
          {errors.season && <p>{errors.season}</p>}
        </div>
        <div>
          <label>Paises: </label>
          <select onChange={(e) => handleSelection(e)}>
            <option name="countryName" selected disabled>
              Destinos
            </option>
            {countries.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          {errors.countryName && <p>{errors.countryName}</p>}
          <ul>
            <li>{input.countryName.map((el) => el + ",")}</li>
          </ul>
          {errors.name ||
          errors.difficulty ||
          errors.duration ||
          errors.season ||
          errors.countryName ? (
            <button disabled>Crear Actividad</button>
          ) : (
            <button type="submit">Crear Actividad </button>
          )}
        </div>
      </form>
      {input.countryName.map((el) => (
        <div>
          <p>{el.name}</p>
          <button onClick={() => handleDelete(el)}>X</button>
        </div>
      ))}
    </div>
  );
}
