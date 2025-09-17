const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function tracksListGet (req, res) {
  res.render("tracks/list", { tracks: ["Track 1", "Track 2"] });
}

async function trackDetailGet (req, res) {
  const id  = req.params.id;
  res.render("tracks/detail", { track: { id, title: "Track " + id } });
}

//TODO: implement the rest of the controller functions (create, update, delete, search)

module.exports = {
  tracksListGet,
  trackDetailGet,
  // tracksCreateGet,
  // tracksCreatePost,
};
