const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const ShortURL = require('./models/url');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const allData = await ShortURL.find({});
  res.render('index', { shortUrls: allData });
});

app.post('/short', async (req, res) => {
  const fullUrl = req.body.fullUrl;
  console.log('URL requested: ', fullUrl);

  const record = new ShortURL({
    full: fullUrl,
  });

  await record.save();

  res.redirect('/');
});

app.get('/:shortid', async (req, res) => {
  const { shortid } = req.params;

  const url = await ShortURL.findOne({ short: shortid });
  if (!url) {
    return res.sendStatus(404);
  }

  url.clicks += 1;
  await url.save();

  res.redirect(url.full);
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log('listen on port ' + PORT);
  });
});
