import generateShips from '../src/generateShips';

describe('generateShips', () => {
  it('creates a ship within the board', () => {
    const ships = generateShips([1], 1, 1);

    expect(ships[0].locations).toEqual([{x: 0, y: 0}]);
  });
  it('creates a ship within the board', () => {
    const ships = generateShips([3], 3, 1);

    expect(ships[0].locations).toEqual([{x: 0, y: 0},{x: 1, y: 0},{x: 2, y: 0}]);
  });
  it('creates a ship within the board', () => {
    const ships = generateShips([3], 1, 3);

    expect(ships[0].locations).toEqual([{x: 0, y: 0},{x: 0, y: 1},{x: 0, y: 2}]);
  });
  it('does not allow ships to overlap', () => {
    const ships = generateShips([4, 4, 4], 3, 4);

    expect(ships).toContain(jasmine.objectContaining({
      locations: [{x: 0, y: 0}, {x: 0, y: 1}, {x: 0, y: 2}, {x: 0, y: 3}]
    }));
    expect(ships).toContain(jasmine.objectContaining({
      locations: [{x: 1, y: 0}, {x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}]
    }));
    expect(ships).toContain(jasmine.objectContaining({
      locations: [{x: 2, y: 0}, {x: 2, y: 1}, {x: 2, y: 2}, {x: 2, y: 3}]
    }));
  });
  it('no ships are placed if no valid locations are found', () => {
    const ships = generateShips([3], 2, 2);

    expect(ships).toContain(jasmine.objectContaining({
      locations: []
    }));
  });
  it('the ships are of the correct sizes', () => {
    const shipSizes = [4, 4, 5];
    const ships = generateShips(shipSizes, 10, 10);

    shipSizes.forEach((shipSize, index) =>
      expect(ships[index].locations.length).toEqual(shipSize)
    );
  });
});
