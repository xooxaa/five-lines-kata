class RawTileFactory {
  private static TILE_MAPPING: { [key: number]: () => Tile } = {
    0: () => new Air(),
    1: () => new Flux(),
    2: () => new Unbreakable(),
    3: () => new PlayerTile(),
    4: () => new Stone(new Resting()),
    5: () => new Stone(new Falling()),
    6: () => new Box(new Resting()),
    7: () => new Box(new Falling()),
    8: () => new Key(YELLOW_KEY),
    9: () => new Locked(YELLOW_KEY),
    10: () => new Key(TEAL_KEY),
    11: () => new Locked(TEAL_KEY),
  };

  static createTile(rawValue: number): Tile {
    const tileFactory = this.TILE_MAPPING[rawValue];
    if (!tileFactory) {
      throw new Error(`No Tile mapped for raw value: ${rawValue}`);
    }
    return tileFactory();
  }
}

interface FallingState {
  isFalling(): boolean;
  drop(tile: Tile, x: number, y: number): void;
  moveHorizontal(map: Map, player: Player, tile: Tile, dx: number): void;
}

class Falling implements FallingState {
  isFalling() {
    return true;
  }
  drop(tile: Tile, x: number, y: number): void {
    map.drop(tile, x, y);
  }
  moveHorizontal(map: Map, player: Player, tile: Tile, dx: number): void {}
}

class Resting implements FallingState {
  isFalling() {
    return false;
  }
  drop(tile: Tile, x: number, y: number): void {}
  moveHorizontal(map: Map, player: Player, tile: Tile, dx: number): void {
    player.pushHorizontal(map, tile, dx);
  }
}

class FallingStrategy {
  constructor(private falling: FallingState) {}

  update(tile: Tile, x: number, y: number): void {
    this.falling = map.getBlockOnTopState(x, y + 1);

    this.falling.drop(tile, x, y);
  }

  moveHorizontal(map: Map, player: Player, tile: Tile, dx: number): void {
    this.falling.moveHorizontal(map, player, tile, dx);
  }
}

class KeyConfiguration {
  constructor(private color: string, private _1: boolean, private removeStrategy: RemoveStrategy) {}

  setColor(g: CanvasRenderingContext2D): void {
    g.fillStyle = this.color;
  }
  is1() {
    return this._1;
  }
  removeLock(): void {
    map.remove(this.removeStrategy);
  }
}

interface RemoveStrategy {
  check(tile: Tile): boolean;
}

class RemoveLock1 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock1();
  }
}

class RemoveLock2 implements RemoveStrategy {
  check(tile: Tile) {
    return tile.isLock2();
  }
}

interface Tile {
  isAir(): boolean;
  isBox(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;
  isFalling(): boolean;
  getBlockOnTopState(): FallingState;

  moveHorizontal(map: Map, player: Player, dx: number): void;
  moveVertical(map: Map, player: Player, dy: number): void;

  update(x: number, y: number): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
}

class Air implements Tile {
  isAir() {
    return true;
  }
  isBox() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isFalling() {
    return false;
  }
  getBlockOnTopState(): FallingState {
    return new Falling();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {
    player.move(dx, 0);
  }
  moveVertical(map: Map, player: Player, dy: number): void {
    player.move(0, dy);
  }

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
}

class Flux implements Tile {
  isAir() {
    return false;
  }
  isBox() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isFalling() {
    return false;
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {
    player.move(dx, 0);
  }
  moveVertical(map: Map, player: Player, dy: number): void {
    player.move(0, dy);
  }

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

class Unbreakable implements Tile {
  isAir() {
    return false;
  }
  isBox() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isFalling() {
    return false;
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {}
  moveVertical(map: Map, player: Player, dy: number): void {}

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

class PlayerTile implements Tile {
  isAir() {
    return false;
  }
  isBox() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isFalling() {
    return false;
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {}
  moveVertical(map: Map, player: Player, dy: number): void {}

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ff0000";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

class Stone implements Tile {
  private fallingStrategy: FallingStrategy;
  constructor(private falling: FallingState) {
    this.fallingStrategy = new FallingStrategy(this.falling);
  }

  isAir() {
    return false;
  }
  isBox() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isFalling() {
    return this.falling.isFalling();
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {
    this.fallingStrategy.moveHorizontal(map, player, this, dx);
  }
  moveVertical(map: Map, player: Player, dy: number): void {}

  update(x: number, y: number): void {
    this.fallingStrategy.update(this, x, y);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

class Box implements Tile {
  private fallingStrategy: FallingStrategy;
  constructor(private falling: FallingState) {
    this.fallingStrategy = new FallingStrategy(this.falling);
  }

  isAir() {
    return false;
  }
  isBox() {
    return true;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isFalling() {
    return this.falling.isFalling();
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {
    this.fallingStrategy.moveHorizontal(map, player, this, dx);
  }
  moveVertical(map: Map, player: Player, dy: number): void {}

  update(x: number, y: number): void {
    this.fallingStrategy.update(this, x, y);
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

class Key implements Tile {
  constructor(private keyConf: KeyConfiguration) {}

  isAir() {
    return false;
  }
  isBox() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }
  isFalling() {
    return false;
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {
    this.keyConf.removeLock();
    player.move(dx, 0);
  }
  moveVertical(map: Map, player: Player, dy: number): void {
    this.keyConf.removeLock();
    player.move(0, dy);
  }

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

    g.font = `${TILE_SIZE / 3}px Arial`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = "black";
    g.fillText("KEY", x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
  }
}

class Locked implements Tile {
  constructor(private keyConf: KeyConfiguration) {}

  isAir() {
    return false;
  }
  isBox() {
    return false;
  }
  isLock1() {
    return this.keyConf.is1();
  }
  isLock2() {
    return !this.keyConf.is1();
  }
  isFalling() {
    return false;
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(map: Map, player: Player, dx: number): void {}
  moveVertical(map: Map, player: Player, dy: number): void {}

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

    g.font = `${TILE_SIZE / 4}px Arial`;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillStyle = "black";
    g.fillText("LOCK", x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
  }
}

interface Input {
  handle(map: Map, player: Player): void;
}

class Right implements Input {
  handle(map: Map, player: Player): void {
    player.moveHorizontal(map, 1);
  }
}

class Left implements Input {
  handle(map: Map, player: Player): void {
    player.moveHorizontal(map, -1);
  }
}

class Up implements Input {
  handle(map: Map, player: Player): void {
    player.moveVertical(map, -1);
  }
}

class Down implements Input {
  handle(map: Map, player: Player): void {
    player.moveVertical(map, 1);
  }
}

class Reset implements Input {
  handle(map: Map, player: Player): void {
    map.reset(player);
  }
}

class Player {
  private x = 1;
  private y = 1;

  reset(): void {
    this.x = 1;
    this.y = 1;
  }
  move(dx: number, dy: number): void {
    this.moveToTile(map, this.x + dx, this.y + dy);
  }
  moveHorizontal(map: Map, dx: number): void {
    map.moveHorizontal(this, this.x, this.y, dx);
  }
  moveVertical(map: Map, dy: number): void {
    map.moveVertical(this, this.x, this.y, dy);
  }
  pushHorizontal(map: Map, tile: Tile, dx: number): void {
    map.pushHorizontal(this, tile, this.x, this.y, dx);
  }

  moveToTile(map: Map, newX: number, newY: number): void {
    map.movePlayer(this.x, this.y, newX, newY);
    this.x = newX;
    this.y = newY;
  }
}

class Map {
  constructor(private rawMap: number[][]) {
    this.transform(this.rawMap);
  }
  private map: Tile[][] = [];

  isAir(x: number, y: number): boolean {
    return this.map[y][x].isAir();
  }

  movePlayer(x: number, y: number, newX: number, newY: number): void {
    this.map[y][x] = new Air();
    this.map[newY][newX] = new PlayerTile();
  }

  moveHorizontal(player: Player, x: number, y: number, dx: number): void {
    this.map[y][x + dx].moveHorizontal(this, player, dx);
  }

  moveVertical(player: Player, x: number, y: number, dy: number): void {
    this.map[y + dy][x].moveVertical(this, player, dy);
  }

  pushHorizontal(player: Player, tile: Tile, x: number, y: number, dx: number): void {
    if (this.map[y][x + dx + dx].isAir() && !this.map[y][x + dx].isAir()) {
      this.map[y][x + dx + dx] = tile;
      player.moveToTile(this, x + dx, y);
    }
  }

  transform(rawMap: number[][]): void {
    this.map = rawMap.map((row) => row.map((value) => RawTileFactory.createTile(value)));
  }

  update(): void {
    for (let y = this.map.length - 1; y >= 0; y--) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.map[y][x].update(x, y);
      }
    }
  }

  draw(g: CanvasRenderingContext2D): void {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.map[y][x].draw(g, x, y);
      }
    }
  }

  drop(tile: Tile, x: number, y: number): void {
    this.map[y + 1][x] = tile;
    this.map[y][x] = new Air();
  }

  getBlockOnTopState(x: number, y: number): FallingState {
    return this.map[y][x].getBlockOnTopState();
  }

  reset(player: Player): void {
    this.transform(rawMap);
    player.reset();
  }

  resetOnWin(player: Player): void {
    if (this.map[4][6].isBox()) {
      this.reset(player);
    }
  }

  remove(removeStrategy: RemoveStrategy): void {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (removeStrategy.check(this.map[y][x])) {
          this.map[y][x] = new Air();
        }
      }
    }
  }
}

const TILE_SIZE = 40;
const FPS = 30;
const SLEEP = 1000 / FPS;

const YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1());
const TEAL_KEY = new KeyConfiguration("#00ccff", false, new RemoveLock2());

const rawMap = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 1, 0, 2],
  [2, 4, 2, 6, 2, 2, 0, 2],
  [2, 8, 4, 1, 1, 11, 0, 2],
  [2, 4, 1, 1, 1, 9, 10, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

const player = new Player();
const map = new Map(rawMap);
const inputs: Input[] = [];

function handleInputs() {
  while (inputs.length > 0) {
    let input = inputs.pop();
    input.handle(map, player);
  }
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let graphics = canvas.getContext("2d");
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  return graphics;
}

function update() {
  handleInputs();
  map.update();
}

function draw() {
  const graphics = createGraphics();
  map.draw(graphics);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  map.resetOnWin(player);
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  gameLoop();
};

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" || e.key === "a") inputs.push(new Left());
  else if (e.key === "ArrowUp" || e.key === "w") inputs.push(new Up());
  else if (e.key === "ArrowRight" || e.key === "d") inputs.push(new Right());
  else if (e.key === "ArrowDown" || e.key === "s") inputs.push(new Down());
  else if (e.key === "r") inputs.push(new Reset());
});
