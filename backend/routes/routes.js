const express = require("express");
const star_controller = require("../controllers/star_controller");
const constellation_controller = require("../controllers/constellation_controller");

const router = express.Router();

router.get("/star", star_controller.get_star_list);
router.post("/star", star_controller.add_star);
router.put("/star", star_controller.update_star);

router.get("/star/:id", star_controller.get_star_by_id);
router.delete("/star/:id", star_controller.delete_star_by_id);

router.get("/constellation", constellation_controller.get_constellation_list);
router.post("/constellation", constellation_controller.add_constellation);
router.put("/constellation", constellation_controller.update_constellation);

router.post("/constellation/link", constellation_controller.add_star_to_constellation);
router.delete("/constellation/link", constellation_controller.remove_star_from_constellation);

router.get("/constellation/:id", constellation_controller.get_constellation_by_id);
router.delete("/constellation/:id", constellation_controller.delete_constellation_by_id);

module.exports = router;
