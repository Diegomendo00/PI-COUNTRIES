const { Router } = require("express");
const axios = require("axios");
const Countries = require("./countries");
const Activities = require("./activities");

const router = Router();

router.use("/countries", Countries);

router.use("/activities", Activities);

module.exports = router;
