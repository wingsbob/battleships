import Ship from './Ship';
import ShotResult from './ShotResult';

export default (ships: Ship[], shotX: number, shotY: number) => {
  const hitShip: Ship = ships.find(({locations}) => locations.some(({x, y}) => x === shotX && y === shotY));

  if (!hitShip) return ShotResult.miss;

  if (hitShip.alreadyHit({x: shotX, y: shotY})) return ShotResult.duplicate;

  hitShip.recordHit({x: shotX, y: shotY});

  return ships.every(ship => ship.sunk) ? ShotResult.won : ShotResult.hit;
}