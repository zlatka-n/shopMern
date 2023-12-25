const express = require('express');
const router = express.Router();
const suggestionsControllers = require('../controllers/suggestions');

router.get('/', suggestionsControllers.getSuggestions);

module.exports = router;
