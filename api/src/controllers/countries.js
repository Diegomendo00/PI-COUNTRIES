const axios = require("axios");
const { Op } = require("sequelize");

const { Country, Activities } = require("../db");

const getCountries = async (req, res) => {
  try {
    const countries = await axios.get(" https://restcountries.com/v3/all");
    const infoApi = await countries.data.map((e) => {
      return {
        id: e.cioc || e.cca3,
        name: e.name.common.toLowerCase(),
        image: e.flags[1],
        continent: e.continents[0],
        capital: e.capital != null ? e.capital[0] : "No hay datos",
        subregion: e.subregion != null ? e.subregion : "No hay datos",
        area: e.area,
        population: e.population,
      };
    });
    await Country.bulkCreate(infoApi);
  } catch (error) {
    res.send(error);
  }
};

const listCountries = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const list = await Country.findAll(
        {
          attributes: ["name", "image", "continent"],
        },
        { include: [{ model: Activities }] }
      );
      res.status(200).json(list);
    } else {
      const country = await Country.findAll({
        where: {
          name: { [Op.substring]: name },
        },
        include: [
          {
            model: Activities,
            attributes: ["name", "difficulty", "duration", "season"],
            through: { attributes: [] },
          },
        ],
      });
      if (country.length) res.status(200).json(country);
      else res.status(404).send("Pais no encontrado");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

const getDetail = async (name) => {
  const country = await Country.findOne({
    where: {
      id: name.toUpperCase(),
    },
    include: [{ model: Activities }],
  });
  return country;
};

module.exports = { getCountries, listCountries, getDetail };
