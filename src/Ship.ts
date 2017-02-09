import ILocation from './ILocation';

const getRandomInt = (max: number) => Math.floor(Math.random() * max);

const hasNoIntersections = (occupiedLocations: ILocation[], suggestedLocations: ILocation[]) =>
  occupiedLocations.every(({x, y}) =>
    !suggestedLocations.some(suggestedLocation => suggestedLocation.x === x && suggestedLocation.y === y)
  );

export default class Ship {
  private size: number;
  locations: ILocation[];
  hits: ILocation[];
  sunk: boolean;

  constructor(size: number) {
    this.size = size;
    this.locations = [];
    this.hits = [];
    Object.defineProperty(this, 'sunk', {
      get: () => this.locations.every(({x, y}) => this.hits.some(hit => hit.x === x && hit.y === y))
    });
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

  recordHit (location: ILocation) {
    this.hits.push(location);
  }

  alreadyHit (location: ILocation) {
    return !hasNoIntersections([location], this.hits);
  }
}