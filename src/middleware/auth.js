const { Request, Response, NextFunction } = require('express');

/**
 * @module Middleware/Auth
 */

/**
 * Middleware to protect a route
 *
 * @async
 * @method protect
 * @param {Request} req - request object
 * @param {Response} res - response object
 * @param  {NextFunction} next - next function
 * @returns {Promise<void>}
 */
const protect = (req, res, next) => {
  const { user } = req.session;

  if (!user) {
    return res
      .status(401)
      .redirect('/login');
  }

  req.user = user;

  next();
};

module.exports = protect;
