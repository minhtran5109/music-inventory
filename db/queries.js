const pool = require('./pool');

async function getAllTracks() {
  const { rows } = await pool.query('SELECT * FROM tracks');
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

module.exports = {
  getAllTracks,
  searchTracks,
  getAllArtists,
  getArtistById,
  insertArtist,
};
