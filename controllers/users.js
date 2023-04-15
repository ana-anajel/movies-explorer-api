const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = require('../utils/constants');
const { CodeSucces } = require('../utils/statusCode');

//const errorHandler = require('.ю/middlewares/errorHandler');
const ConflictError = require('../errors/ConflictError');
const BadReqestError = require('../errors/BadReqestError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');


const createUser = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const { name, email } = req.body;
    const user = await User.create({ name, email, password: hash });
    return res.status(CodeSucces.CREATED).json({
      name: user.name,
      email: user.email,
      _id: user.id
    });
  } catch (e) {
    if (e.code === 11000) {
      return next(new ConflictError('Пользователь с таким email уже существует.'));
    }
    if (e.name === 'ValidationError') {
      return next(new BadReqestError('Переданы некорректные данные при создании.'));
    }
    return next(e);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(`Пользователь по указанному _id: ${req.user._id} не найден.`);
    }
    return res.send(user);
  } catch (e) {
    return next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { email, name } = req.body;
    await User.findByIdAndUpdate(req.user._id, { email, name }, { new: true });
    const user = await User.findById(req.user._id);
    return res.json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadReqestError('Переданы некорректные данные для изменения данных профиля.'));
    }
    return next(e);
  }
};

// проверяем почту и пароль
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (user === null) {
      throw new UnauthorizedError('Неправильные почта или пароль.');
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Неправильные почта или пароль.');
    }

    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
      { expiresIn: '7d' },
    );
    return res.status(200).send({ token });
    // return res.cookie('jwt', token, {
    //   maxAge: 3600000 * 24 * 7,
    //   httpOnly: true,
    // }).send({ message: `Этот токен безопасно сохранен в httpOnly куку: ${token}` });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return next(new BadReqestError('Переданы некорректные данные при создании.'));
    }
    console.log(e);
    return next(e);
  }
};

module.exports = { getUser, updateUser, createUser, login };
