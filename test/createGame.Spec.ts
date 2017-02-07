import createGame from '../src/createGame';

describe('createGame', () => {
  it('creates a grid', () => {
    const root = document.body.appendChild(document.createElement('div'));

    createGame({
      width: 5,
      height: 5,
      ships: [],
      root
    });

    expect(root);

    root.parentElement.removeChild(root);
  });
});
