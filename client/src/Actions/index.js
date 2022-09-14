import axios from "axios";

export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_DETAILS = "GET_DETAILS";
export const FILTER_BY_CONTINENT = "FILTER_BY_CONTINENT";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_NAME_COUNTRY = "GET_NAME_COUNTRY";
export const POST_ACTIVITY = "POST_ACTIVITY";
export const GET_ACTIVITY = "GET_ACTIVITY";
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION";
export const FILTER_BY_ACTIVTY = "FILTER_BY_ACTIVTY";

export function getCountries() {
  return async function (dispatch) {
    return fetch("http://localhost:3001/countries")
      .then((response) => response.json())
      .then((countries) =>
        dispatch({ type: GET_COUNTRIES, payload: countries })
      );
  };
}

export function getByName(name) {
  return async function (dispatch) {
    try {
      return fetch("http://localhost:3001/countries?name=" + name)
        .then((res) => res.json())
        .then((name) => {
          dispatch({ type: GET_NAME_COUNTRY, payload: name });
        });
    } catch (error) {
      console.log({ error });
    }
  };
}

export function postActivities(payload) {
  return async function (dispatch) {
    try {
      let res = await axios.post("http://localhost:3001/activities", payload);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
}

// export function getActivities() {
//   return async function (dispatch) {
//     try {
//       return fetch("http://localhost:3001/activities")
//         .then((res) => res.json())
//         .then((activity) => {
//           dispatch({ type: GET_ACTIVITY, payload: activity });
//         });
//     } catch (error) {
//       console.log({ error });
//     }
//   };
// }

export function getActivities() {
  return async function (dispatch) {
    try {
      let json = await axios.get("http://localhost:3001/activities");
      return dispatch({
        type: GET_ACTIVITY,
        payload: json.data,
      });
    } catch (error) {
		 console.log( error );
	 }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    return fetch("http://localhost:3001/countries/" + id)
      .then((res) => res.json())
      .then((detail) => {
        dispatch({ type: GET_DETAILS, payload: detail });
      });
  };
}

export function countriesByContinent(payload) {
  return {
    type: FILTER_BY_CONTINENT,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByPopulation(payload) {
  return {
    type: ORDER_BY_POPULATION,
    payload,
  };
}

export function filterByActivitiy(payload) {
  return {
    type: FILTER_BY_ACTIVTY,
    payload,
  };
}
