const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');

router.use('/users', users);
router.use('/movies', movies);

module.exports = router;
