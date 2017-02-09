import takeShot from '../src/takeShot';
import Ship from '../src/Ship';
import ShotResult from '../src/ShotResult';


describe('takeShot', () => {
  it('returns "hit" when the shot hits a ship', () => {
    const ship = new Ship(4);

    ship.place([], 1, 4);

    const result = takeShot([ship], 0, 1);

    expect(result).toEqual(ShotResult.hit);
  });
  it('returns "miss" when the shot does not hit a ship', () => {
    const ship = new Ship(4);

    ship.place([], 1, 4);

    const result = takeShot([ship], 1, 0);

    expect(result).toEqual(ShotResult.miss);
  });
  it('returns "duplicate" when the shot has already been taken', () => {
    const ship = new Ship(4);

    ship.place([], 1, 4);

    takeShot([ship], 1, 0);
    const result = takeShot([ship], 1, 0);

    expect(result).toEqual(ShotResult.duplicate);
  });
})