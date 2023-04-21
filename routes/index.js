const router = require('express').Router();
const users = require('./users');
const movies = require('./movies');
const auth = require('../middlewares/auth');
const { validateSignUp, validateSignIn } = require('../middlewares/validate');
const { createUser, login, signOut } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', validateSignUp, createUser);
router.post('/signin', validateSignIn, login);
router.use(auth);
router.use('/users', users);
router.use('/movies', movies);
router.post('/signout', signOut);
router.use('*', (req, res, next) => next(new NotFoundError('Страница не существует.')));

module.exports = router;
