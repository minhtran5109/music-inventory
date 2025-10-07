const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function tracksListGet (req, res) {
  const tracks = await db.getAllTracksArtists();
  res.render("tracks/list", {
      title: "Tracks",
      tracks: tracks,
    });
}

async function trackDetailGet (req, res) {
  const id  = req.params.id;
  const track = await db.getTrackById(id);
  if (!track) {
    return res.status(404).send("Track not found");
  }

  const artistResults = await db.getArtistsByTrack(id);
  res.render("tracks/detail", { 
    title: track.title, 
    track: track,
    artists: artistResults,
  });
}

//TODO: implement the rest of the controller functions (create, update, delete, search)

module.exports = {
  tracksListGet,
  trackDetailGet,
  // tracksCreateGet,
  // tracksCreatePost,
};
