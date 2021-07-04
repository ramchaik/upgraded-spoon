const ShortURL = require('../models/url');

exports.get = async (req, res) => {
  const allData = await ShortURL.find({});
  const { user } = req.session;
  res.render('index', { shortUrls: allData, user });
};

exports.create = async (req, res) => {
  const fullUrl = req.body.fullUrl;
  console.log('URL requested: ', fullUrl);

  const record = new ShortURL({
    full: fullUrl,
  });

  await record.save();

  res.redirect('/');
};

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

exports.renderRegister = async (req, res) => {
  res.render('register');
};

exports.renderLogin = async (req, res) => {
  res.render('login');
};
