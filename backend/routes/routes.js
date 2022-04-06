const express = require("express");
const star_controller = require("../controllers/star_controller");
const constellation_controller = require("../controllers/constellation_controller");

const router = express.Router();

router.get("/star", star_controller.get_star_list);

module.exports = router;
