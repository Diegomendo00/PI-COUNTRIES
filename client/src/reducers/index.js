import {
  GET_COUNTRIES,
  GET_DETAILS,
  FILTER_BY_CONTINENT,
  ORDER_BY_NAME,
  GET_NAME_COUNTRY,
  POST_ACTIVITY,
  GET_ACTIVITY,
  ORDER_BY_POPULATION,
  FILTER_BY_ACTIVTY,
} from "../Actions";

const inicialState = {
  countries: [],
  allCountries: [],
  activities: [],
  details: [],
};

export default function rootReducer(state = inicialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
        allCountries: action.payload,
      };
    case GET_NAME_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_ACTIVITY:
      return {
        ...state,
        activities: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case POST_ACTIVITY:
      return {
        ...state,
      };
    case FILTER_BY_CONTINENT:
      const allCountries = state.allCountries;
      const filterCountries =
        action.payload === "All"
          ? allCountries
          : allCountries.filter((el) => el.continent === action.payload);
      return {
        ...state,
        countries: filterCountries,
      };
    case FILTER_BY_ACTIVTY:
      let filter =
        action.payload === "sin filtro"
          ? state.allCountries
          : state.allCountries.filter((country) => {
              const activities = country.activities.map((a) => a.name);
              return activities.includes(action.payload);
            });
      return {
        ...state,
        countries: filter,
      };

    case ORDER_BY_NAME:
      const orderName =
        action.payload === "asc"
          ? state.countries.sort(function (a, b) {
              if (a.name > b.name) return 1;
              if (b.name > a.name) return -1;
              return 0;
            })
          : state.countries.sort(function (a, b) {
              if (a.name > b.name) return -1;
              if (b.name > a.name) return 1;
              return 0;
            });
      return {
        ...state,
        countries: orderName,
      };
    case ORDER_BY_POPULATION:
      const orderPopulation =
        action.payload === "min"
          ? state.allCountries.sort(function (a, b) {
              if (a.population > b.population) return 1;
              if (b.population > a.population) return -1;
              return 0;
            })
          : state.allCountries.sort(function (a, b) {
              if (a.population > b.population) return -1;
              if (b.population > a.population) return 1;
              return 0;
            });
      return {
        ...state,
        countries: orderPopulation,
      };

    default:
      return state;
  }
}
