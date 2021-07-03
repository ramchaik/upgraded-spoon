const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const urlRouter = require('./routes');
const urlController = require('./controllers');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;

app.get('/', urlController.get);
app.use('/api/v1/url', urlRouter);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log('listen on port ' + PORT);
  });
});
