const axios = require("axios");
const { Country, Activities } = require("../db");

const createAct = async (req, res) => {
  const { name, difficulty, duration, season, countryName } = req.body;
  if (!name || !difficulty || !duration || !season || !countryName)
    res.status(404).send("Faltan campos por completar");
  try {
    const newActivity = await Activities.create({
      name,
      difficulty,
      duration,
      season,
    });

    const country = await Country.findAll({
      where: {
        name: countryName,
      },
    });
    newActivity.addCountries(country);
    res.status(200).send("Actividad creada");
  } catch (error) {
    console.log(error);
  }
};

const getActivities = async (req, res) => {
  const list = await Activities.findAll({ include: [{ model: Country }] });
  if (list.length !== 0) res.status(200).json(list);
  else res.status(404).send("No se encuentran actividades");
};
module.exports = { createAct, getActivities };
