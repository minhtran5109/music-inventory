const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function artistsListGet (req, res) {
  res.render("artists/list", { artists: ["Artist A", "Artist B"] });
}

async function artistDetailGet (req, res) {
  const id  = req.params.id;
  res.render("artists/detail", { artist: { id, name: "Artist " + id } });
}

//TODO: implement the rest of the controller functions (create, update, delete, search)

module.exports = {
  artistsListGet,
  artistDetailGet,
  // artistsCreateGet,
  // artistsCreatePost,
};
