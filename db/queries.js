const pool = require('./pool');

async function getAllTracks() {
  const { rows } = await pool.query('SELECT * FROM tracks');
  return rows;
}

async function getTrackById(id) {
  const { rows } = await pool.query('SELECT * FROM tracks WHERE track_id = $1', [id]);
  return rows[0];
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

async function searchTracks(search) {
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

module.exports = {
  getAllTracks,
  getTrackById,
  searchTracks,
  getAllTracksArtists,
  getAllArtists,
  getArtistById,
  insertArtist,
  getArtistsByTrack
};
