import createGame from '../src/createGame';

describe('createGame', () => {
  it('creates a grid', () => {
    const root = document.body.appendChild(document.createElement('div'));

    createGame({
      width: 5,
      height: 5,
      shipSizes: [],
      root
    });

    expect(root).not.toBeEmpty();
    expect(jQuery(root).find('.cell')).toHaveLength(25);
    expect(jQuery(root).find('.row')).toHaveLength(5);

    root.parentElement.removeChild(root);
  });
  describe('clicking on a cell', () => {
    it('will set the cell to a hit or a miss', () => {
      const root = document.body.appendChild(document.createElement('div'));

      createGame({
        width: 5,
        height: 5,
        shipSizes: [],
        root
      });
      jQuery('.cell:first').click();

      expect(jQuery('.cell.hit,.cell.miss')).toHaveLength(1);
      root.parentElement.removeChild(root);
    });
  });
  describe('clicking on the root, but not in a cell', () => {
    it('does not error clicking on the root', () => {
      const root = document.body.appendChild(document.createElement('div'));

      createGame({
        width: 5,
        height: 5,
        shipSizes: [],
        root
      });
      jQuery(root).click();

      expect(jQuery('.cell.hit,.cell.miss')).toHaveLength(0);

      root.parentElement.removeChild(root);
    });
    it('does not error clicking on a row div', () => {
      const root = document.body.appendChild(document.createElement('div'));

      createGame({
        width: 5,
        height: 5,
        shipSizes: [],
        root
      });
      jQuery('.row:first').click();

      expect(jQuery('.cell.hit,.cell.miss')).toHaveLength(0);

      root.parentElement.removeChild(root);
    });
  });
});
