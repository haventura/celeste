const db = require("../models/index");
const Star = db.Star;
const Constellation = db.Constellation;

exports.get_star_list = async function (req, res) {
  let wh = {};
  if (req.query.name !== undefined) {
    wh = { name: req.query.name };
  }
  await Star.findAll({
    include: Constellation,
    attributes: { exclude: ["constellation_id"] },
    where: wh,
  })
    .then((data) => {
      console.log(`>>get_star_list with name = ${req.query.name}<<`);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.add_star = async function (req, res) {
  await Star.build({
    name: req.body.name,
    description: req.body.description,
    right_ascension: req.body.right_ascension,
    declination: req.body.declination,
    apparent_magnitude: req.body.apparent_magnitude,
    mass: req.body.mass,
    radius: req.body.radius,
    age: req.body.age,
  })
    .save()
    .then((data) => {
      console.log(`>>add_star with id = ${data.star_id}<<`);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.update_star = async function (req, res) {
  await Star.update(
    {
      name: req.body.name,
      description: req.body.description,
      right_ascension: req.body.right_ascension,
      declination: req.body.declination,
      apparent_magnitude: req.body.apparent_magnitude,
      mass: req.body.mass,
      radius: req.body.radius,
      age: req.body.age,
    },
    { where: { star_id: req.body.star_id } }
  )
    .then((data) => {
      console.log(`>>update_star with id = ${req.body.star_id}<<`);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.get_star_by_id = async function (req, res) {
  await Star.findOne({
    include: Constellation,
    attributes: { exclude: ["constellation_id"] },
    where: { star_id: req.params.id },
  })
    .then((data) => {
      console.log(`>>get_star_by_id with id = ${req.params.id}<<`);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.delete_star_by_id = async function (req, res) {
  await Star.destroy({ where: { star_id: req.params.id } })
    .then((data) => {
      console.log(`>>delete_star_by_id with id = ${req.params.id}<<`);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
