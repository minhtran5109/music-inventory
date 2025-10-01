const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function artistsListGet (req, res) {
  const artists = await db.getAllArtists();
  res.render("artists/list", {
      title: "Artists",
      artists: artists,
    });
}

async function artistDetailGet (req, res) {
  const id  = req.params.id;
  const artist = await db.getArtistById(id);
  if (!artist) {
    return res.status(404).send("Artist not found");
  }
  console.log("Artist detail: ", artist);
  res.render("artists/detail", { 
    title: "Detail about " + artist.name, 
    artist: artist
  });
}

async function artistsCreateGet (req, res) {
  res.render("artists/form", { title: "Add Artist" });
}

async function artistsCreatePost (req, res) {
  const {name, country} = req.body;
  const result = await db.insertArtist(name, country);
  // console.log("Insert result: ", result);
  const newArtistId = result.rows[0].artist_id;
  res.redirect(`/artists/${newArtistId}`);
}

module.exports = {
  artistsListGet,
  artistDetailGet,
  artistsCreateGet,
  artistsCreatePost,
};
