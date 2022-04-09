const db = require("../models/index");
const Star = db.Star;
const Constellation = db.Constellation;

exports.get_constellation_list = async function (req, res) {
  let wh = {};
  if (req.query.name !== undefined) {
    wh = { name: req.query.name };
  }
  await Constellation.findAll({
    include: Star,
    where: wh,
  })
    .then((data) => {
      console.log(`>>get_constellation_list with name = ${req.query.name}<<`);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};

exports.add_constellation = async function (req, res) {
  await Constellation.build({
    name: req.body.name,
    description: req.body.description,
    right_ascension: req.body.right_ascension,
    declination: req.body.declination,
    area: req.body.area,
  })
    .save()
    .then((data) => {
      console.log(`>>add_constellation with id = ${data.constellation_id}<<`);
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.update_constellation = async function (req, res) {
  await Constellation.update(
    {
      name: req.body.name,
      description: req.body.description,
      right_ascension: req.body.right_ascension,
      declination: req.body.declination,
      area: req.body.area,
    },
    { where: { constellation_id: req.body.constellation_id } }
  )
    .then((data) => {
      console.log(
        `>>update_constellation with id = ${req.body.constellation_id}<<`
      );
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.get_constellation_by_id = async function (req, res) {
  await Constellation.findOne({
    include: Star,
    where: { constellation_id: req.params.id },
  })
    .then((data) => {
      console.log(
        `>>get_constellation_by_id with id = ${req.params.id}<<`
      );
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.delete_constellation_by_id = async function (req, res) {
  await Constellation.destroy({ where: { constellation_id: req.params.id } })
    .then((data) => {
      console.log(
        `>>delete_constellation_by_id with id = ${req.params.id}<<`
      );
      res.json(data);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.add_star_to_constellation = async function (req, res) {
  await Star.findOne({ where: { star_id: req.query.star_id } })
    .then(async function (star) {
      await Constellation.findOne({
        where: { constellation_id: req.query.constellation_id },
      })
        .then(async function (constellation) {
          await constellation
            .addStar(star)
            .then((data) => {
              console.log(
                `>>add_star_to_constellation with star_id = ${req.query.star_id} and constellation_id = ${req.query.constellation_id}<<`
              );
              res.json(data);
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
exports.remove_star_from_constellation = async function (req, res) {
  await Star.findOne({ where: { star_id: req.query.star_id } })
    .then(async function (star) {
      await Constellation.findOne({
        where: { constellation_id: req.query.constellation_id },
      })
        .then(async function (constellation) {
          await constellation
            .removeStar(star)
            .then((data) => {
              console.log(
                `>>remove_star_from_constellation with star_id = ${req.query.star_id} and constellation_id = ${req.query.constellation_id}<<`
              );
              res.json(data);
            })
            .catch((err) => {
              res.status(500).json({ message: err.message });
            });
        })
        .catch((err) => {
          res.status(500).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
};
