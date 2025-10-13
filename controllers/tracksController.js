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

async function tracksCreateGet (req, res) {
  const artists = await db.getAllArtists();
  // const albums = [];
  const albums = await db.getAllAlbums();
  res.render("tracks/form", { 
    title: "Add Track", 
    artists: artists, 
    albums: albums
  });
}

const notEmptyErr = "must be specified.";

const validateTrack = [
  body("title").trim()
    .notEmpty().withMessage(`Title ${notEmptyErr}`),
  // body("artist_ids").isArray().withMessage(`At least one artist ${notEmptyErr}`),
];

const tracksCreatePost = [ validateTrack, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("tracks/form", {
      title: "Add Track",
      errors: errors.array(),
    });
  }
  console.log("Track to be saved: ", req.body);
  const { title, duration, album_id, artist_id } = req.body;
  const newTrack = await db.insertTrack(title, duration, album_id);
  await db.insertTrackArtist(newTrack.track_id, artist_id);
  // Redirect to the new track's detail page
  res.redirect(`/tracks/${newTrack.track_id}`);
}];

module.exports = {
  tracksListGet,
  trackDetailGet,
  tracksCreateGet,
  tracksCreatePost,
};
