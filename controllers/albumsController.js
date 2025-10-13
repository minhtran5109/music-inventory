const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

const albumsListGet = async (req, res) => {
  const albums = await db.getAllAlbums();
  res.render("albums/list", { albums });
};

async function albumsCreateGet(req, res) {
  res.render("albums/form");
}

async function albumsCreatePost(req, res) { 
  const { title, release_year } = req.body;
  const newAlbum = await db.insertAlbum(title, release_year);
  // Redirect to the new album's detail page
  res.redirect(`/albums/`);
}

module.exports = {
  albumsListGet,
  albumsCreateGet,
  albumsCreatePost,
};
