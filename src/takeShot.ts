import Ship from './Ship';
import ShotResult from './ShotResult';

export default (ships: Ship[], shotX: number, shotY: number) => {
  return ships.some(({locations}) => locations.some(({x, y}) => x === shotX && y === shotY)) ? ShotResult.hit : ShotResult.miss;
}