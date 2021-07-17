const { Request, Response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

/**
 * @module Controller/Auth
 */

/**
 * Register a user
 * @async
 * @method register
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @return {Promise<void>}
 */
exports.register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    req.session.user = newUser;
    res.status(201).redirect('/');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};

/**
 * Login a user
 *
 * @async
 * @method login
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @return {Promise<void>}
 */
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'user not found',
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        status: 'fail',
        message: 'incorrect username or password',
      });
    }

    req.session.user = user;
    res.status(200).redirect('/');
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
    });
  }
};
