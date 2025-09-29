const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController');

// Default root (e.g., http://localhost:3000/)
router.get('/', indexController.index);

module.exports = router;
