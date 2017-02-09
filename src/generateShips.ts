class ILocation {
  [index: string]: number;
  x: number;
  y: number;
}

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const hasNoIntersections = (occupiedLocations: ILocation[], suggestedLocations: ILocation[]) =>
  occupiedLocations.every(({x, y}) =>
    !suggestedLocations.some(suggestedLocation => suggestedLocation.x === x && suggestedLocation.y === y)
  )

class Ship {
  private size: number;
  locations: ILocation[];

  constructor(size: number) {
    this.size = size;
    this.locations = [];
  }

  place (occupiedLocations: ILocation[], width: number, height: number, getRandom = getRandomInt) {
    let isPlaced = false;
    let attempts = 0;

    while (!isPlaced && attempts < 10000) {
      const isHorizontal = getRandom(2) === 1;

      const heading = getRandom((isHorizontal ? width : height) - this.size);
      const offset = getRandom(isHorizontal ? height : width);

      if (heading >= 0 && offset >= 0) { // ensure we're on the board :)
        const locations: ILocation[] = [];

        for (let i = 0; i < this.size; i++) {
          const position = heading + i;

          locations.push({
            x: isHorizontal ? position : offset,
            y: isHorizontal ? offset : position
          });
        }

        if (hasNoIntersections(occupiedLocations, locations)) {
          const {push} = Array.prototype;

          isPlaced = true;
          push.apply(this.locations, locations);
        }
      }
      attempts++;
    }
  }
}

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
