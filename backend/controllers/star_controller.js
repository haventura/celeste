const db = require("../models/index");
const Star = db.Star;
const Constellation = db.Constellation;

exports.get_star_list = async function (req, res) {
  await Star.findAll({ include: Constellation })
    .then((data) => {
      console.log("All star:", JSON.stringify(data, null, 2));
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};