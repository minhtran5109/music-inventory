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
  body("title")
    .trim()
    .notEmpty()
    .withMessage(`Title ${notEmptyErr}`),
  body("artist_ids")
    .customSanitizer(value => {
      if (!value) return [];
      return Array.isArray(value) ? value : [value];
    })
    .isArray({ min: 1 })  
    .withMessage(`At least one artist ${notEmptyErr}`),
];

const tracksCreatePost = [ validateTrack, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("tracks/form", {
      title: "Add Track",
      errors: errors.array(),
    });
  }
  // console.log("Track to be saved: ", req.body);s
  const { title, duration, album_id, artist_ids } = req.body;
  const newTrack = await db.insertTrack(title, duration, album_id);
  const artistArray = Array.isArray(artist_ids) ? artist_ids : [artist_ids];
  for (const artist_id of artistArray){
    await db.insertTrackArtist(newTrack.track_id, artist_id);
  }
  // Redirect to the new track's detail page
  res.redirect(`/tracks/${newTrack.track_id}`);
}];

async function tracksUpdateGet (req, res) {
  const id  = req.params.id;
  const track = await db.getTrackById(id);
  if (!track) {
    return res.status(404).send("Track not found");
  }
  const artists = await db.getAllArtists();
  const albums = await db.getAllAlbums();
  const trackArtists = await db.getArtistsByTrack(id);
  const trackArtistIds = trackArtists.map(artist => artist.artist_id);
  
  res.render("tracks/edit", {
    track: track,
    albums: albums,
    artists: artists,
    trackArtistIds: trackArtistIds,
  });
}

const tracksUpdatePost = [ validateTrack, async (req, res) => {
  const id  = req.params.id;
  const track = await db.getTrackById(id);
  const artists = await db.getAllArtists();
  const albums = await db.getAllAlbums();
  const trackArtists = await db.getArtistsByTrack(id);
  const trackArtistIds = trackArtists.map(artist => artist.artist_id);
  if (!track) {
    return res.status(404).send("Track not found");
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).render("tracks/edit", {
      track: track,
      albums: albums,
      artists: artists,
      trackArtistIds: trackArtistIds,
      errors: errors.array(),
    });
  }

  const { title, duration, album_id, artist_ids } = req.body;

  //Update track info
  await db.updateTrack(title, duration, album_id, id);

  //Reset track artists
  await db.deleteTrackArtist(id);
  const artistArray = Array.isArray(artist_ids) ? artist_ids : [artist_ids];
  for (const artist_id of artistArray){
    await db.insertTrackArtist(id, artist_id);
  }

  // Redirect to the updated track's detail page
  res.redirect(`/tracks/${id}`);
}]

async function tracksDeleteGet (req, res) {
  const id  = req.params.id;
  const track = await db.getTrackById(id);
  if (!track) {
    return res.status(404).send("Track not found");
  }
  res.render("tracks/delete", {
    title: "Delete Track",
    track: track,
  });
}

async function tracksDeletePost (req, res) {
  const id  = req.params.id;
  const track = await db.getTrackById(id);
  if (!track) {
    return res.status(404).send("Track not found");
  }
  await db.deleteTrack(id);
  // Redirect to the tracks list page
  res.redirect("/tracks");
}

module.exports = {
  tracksListGet,
  trackDetailGet,
  tracksCreateGet,
  tracksCreatePost,
  tracksUpdateGet,
  tracksUpdatePost,
  tracksDeleteGet,
  tracksDeletePost,
};
