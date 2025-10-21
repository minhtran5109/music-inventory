const pool = require('./pool');

async function getAllTracks() {
  const { rows } = await pool.query('SELECT * FROM tracks');
  return rows;
}

async function getTrackById(id) {
  const { rows } = await pool.query('SELECT * FROM tracks WHERE track_id = $1', [id]);
  return rows[0];
}

async function insertTrack(title, duration, album_id) {
  const { rows } = await pool.query(`
    INSERT INTO tracks (title, duration, album_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `, [title, duration, album_id || null]);
  const track = rows[0];
  return track;
}

async function getAllTracksArtists() {
  const { rows } = await pool.query(`
    SELECT t.track_id, t.title, STRING_AGG(a.name, ', ') AS artists
    FROM tracks t
    LEFT JOIN track_artists ta ON t.track_id = ta.track_id
    LEFT JOIN artists a ON ta.artist_id = a.artist_id
    GROUP BY t.track_id
    ORDER BY t.title asc
  `);
  return rows;
}

async function insertTrackArtist(track_id, artist_id) {
  await pool.query('INSERT INTO track_artists (track_id, artist_id) VALUES ($1, $2)', [track_id, artist_id]);
}

async function deleteTrackArtist(track_id) {
  await pool.query('DELETE FROM track_artists WHERE track_id = $1', [track_id]);
}

async function updateTrack(title, duration, album_id, track_id) {
  const { rows } = await pool.query(`
    UPDATE tracks
    SET title = $1, duration = $2, album_id = $3
    WHERE track_id = $4
    RETURNING *
  `, [title, duration, album_id || null, track_id]);
  return rows[0];
}

async function searchTrack(search) {
  const { rows } = await pool.query('SELECT * FROM tracks WHERE title ILIKE $1', [`%${search}%`]);
  return rows;
}

async function getAllArtists() {
  const { rows } = await pool.query('SELECT * FROM artists');
  return rows;
}

async function getArtistById(id) {
  const { rows } = await pool.query('SELECT * FROM artists WHERE artist_id = $1', [id]);
  return rows[0];
}

async function insertArtist(name, country) {
  return await pool.query('INSERT INTO artists (name, country) VALUES ($1, $2) RETURNING *', [name, country]);
}

async function getArtistsByTrack(trackId) {
  const { rows } = await pool.query(`
    SELECT *
    FROM artists a
    JOIN track_artists ta ON a.artist_id = ta.artist_id
    WHERE ta.track_id = $1
  `, [trackId]);
  return rows;
}

async function getAllAlbums() {
  const { rows } = await pool.query('SELECT * FROM albums');
  return rows;
}

async function insertAlbum(title, release_year) {
  const { rows } = await pool.query(`
    INSERT INTO albums (title, release_year)
    VALUES ($1, $2)
    RETURNING *
  `, [title, release_year || null]);
  return rows[0];
}

module.exports = {
  getAllTracks,
  getTrackById,
  insertTrack,
  insertTrackArtist,
  deleteTrackArtist,
  updateTrack,
  searchTrack,
  getAllTracksArtists,
  getAllArtists,
  getArtistById,
  insertArtist,
  getArtistsByTrack,
  getAllAlbums,
  insertAlbum
};
