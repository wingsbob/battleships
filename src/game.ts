import createGame from './createGame';

createGame({
  root: document.getElementById('root'),
  width: 10,
  height: 10,
  shipSizes: [5, 4, 4]
});
