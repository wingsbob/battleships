import generateShips from './generateShips';

interface IGameConfig {
  root: Node;
  width: number;
  height: number;
  shipSizes: number[];
}
interface Array<T> {
  find(predicate: (search: T) => boolean) : T;
}

export default ({root, width, height, shipSizes}: IGameConfig) => {
  for (let i = 0; i < height; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    root.appendChild(row);
    for (let j = 0; j < width; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      row.appendChild(cell);
    }
  }

  const ships = generateShips(shipSizes, width, height);

  root.addEventListener('click', ({target}) => {
    const {find, includes, indexOf} = Array.prototype;

    const row: HTMLDivElement = find.call(root.childNodes, (row: HTMLDivElement) =>
      includes.call(row.childNodes, target)
    );
    const cell: HTMLDivElement = find.call(row.childNodes, (cell: HTMLDivElement) => cell === target);
    cell.classList.add('miss');
  });
};
