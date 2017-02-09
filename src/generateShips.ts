import Ship from './Ship';
import ILocation from './ILocation';

export default (shipSizes: number[], width: number, height: number) => {
  const ships = shipSizes.map(shipSize => new Ship(shipSize));

  ships.forEach((ship, index) =>
    ship.place(
      ships.slice(0, index)
        .map(({locations}) => locations)
        .reduce((all, curr) => all.concat(curr), []),
      width,
      height
    )
  );

  return ships;
}
