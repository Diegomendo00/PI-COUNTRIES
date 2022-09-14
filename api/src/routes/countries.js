const { Router } = require("express");
const router = Router();
const { listCountries, getDetail, getMaxPopulation } = require("../controllers/countries");
const { Country, Activities } = require("../db");

router.get("", listCountries);

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const country = await getDetail(id);
    res.status(200).json(country);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/population",getMaxPopulation 
)
module.exports = router;
