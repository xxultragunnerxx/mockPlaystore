const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

const playstore = require('./playstore.js')

app.get('/apps', (req, res) => {

  const { search = ""} = req.query;

  let results = playstore.filter(playstore => playstore.Genres.toLowerCase().includes(search.toLowerCase()));
  res.json(results);

});

app.listen(8000, () => {
  console.log('Express server is listening on port 8000!');

});
