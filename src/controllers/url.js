const { Request, Response } = require('express');

const ShortURL = require('../models/url');

/**
 * @module Controller/URL
 */

/**
 * Create a new shortened url
 * 
 * @async
 * @method create
 * @param {Request} req - request object 
 * @param {Response} res - response object 
 * @return {Promise<void>}
 */
exports.create = async (req, res) => {
  const fullUrl = req.body.fullUrl;
  console.log('URL requested: ', fullUrl);

  const record = new ShortURL({
    full: fullUrl,
  });

  await record.save();

  res.redirect('/');
};

/**
 * Redirect shortened url to the original url
 * 
 * @async
 * @method getByShortId
 * @param {Request} req - request object 
 * @param {Response} res - response object 
 * @return {Promise<void>}
 */
exports.getByShortId = async (req, res) => {
  const { shortid } = req.params;

  const url = await ShortURL.findOne({ short: shortid });
  if (!url) {
    return res.sendStatus(404);
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.full);
};

/**
 * Renders the landing page with all the shortened links
 * 
 * @async
 * @method get
 * @param {Request} req - request object 
 * @param {Response} res - response object 
 * @return {Promise<void>}
 */
exports.get = async (req, res) => {
  const allData = await ShortURL.find({});
  const { user } = req.session;
  res.render('index', { shortUrls: allData, user });
};

/**
 * Renders the register form
 * 
 * @async
 * @method renderRegister
 * @param {Request} req - request object 
 * @param {Response} res - response object 
 * @return {Promise<void>}
 */
exports.renderRegister = async (req, res) => {
  res.render('register');
};

/**
 * Renders the login form
 * 
 * @async
 * @method renderLogin
 * @param {Request} req - request object 
 * @param {Response} res - response object 
 * @return {Promise<void>}
 */
exports.renderLogin = async (req, res) => {
  res.render('login');
};
