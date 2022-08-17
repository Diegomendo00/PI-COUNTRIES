const { Router } = require("express");
const router = Router();
const { Country, Activities } = require("../db");
const { createAct, getActivities } = require("../controllers/activities");

router.post("", createAct);
router.get("", getActivities);
module.exports = router;
