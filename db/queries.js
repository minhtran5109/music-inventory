const pool = require('../db/pool');

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

//TODO: implement more database queries for records (CRUD operations)

module.exports = {
  getAllTracks,
  getAllArtists,
  searchTracks
};
