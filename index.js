const express = require('express');
const app = express();
const browserify = require('browserify');
const path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/index.html', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/game.css', (req, res) => res.sendFile(path.join(__dirname, 'game.css')));
app.get('/game.js', (req, res) => {
  let script = '';

  browserify('src/game.ts', {
    plugin: ['tsify']
  })
  .bundle()
  .pipe(res);
});

app.listen(5500);