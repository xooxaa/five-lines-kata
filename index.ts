const TILE_SIZE = 40;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE,
  FALLING_STONE,
  BOX,
  FALLING_BOX,
  KEY1,
  LOCK1,
  KEY2,
  LOCK2,
}

interface FallingState {
  isFalling(): boolean;
  moveHorizontal(tile: Tile, dx: number): void;
}
class Falling implements FallingState {
  isFalling(): boolean {
    return true;
  }
  moveHorizontal(tile: Tile, dx: number): void {}
}
class Resting implements FallingState {
  isFalling(): boolean {
    return false;
  }

  moveHorizontal(tile: Tile, dx: number): void {
    if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = tile;
      moveToTile(playerx + dx, playery);
    }
  }
}

class FallStrategy {
  constructor(private falling: Falling) {}

  update(tile: Tile, x: number, y: number): void {
    this.falling = map[y + 1][x].isAir() ? new Falling() : new Resting();
    this.drop(tile, x, y);
  }

  private drop(tile: Tile, x: number, y: number) {
    if (map[y + 1][x].isAir()) {
      map[y + 1][x] = tile;
      map[y][x] = new Air();
    }
  }
}

interface Tile {
  isAir(): boolean;
  isLock1(): boolean;
  isLock2(): boolean;

  isFalling(): boolean;
  canFall(): boolean;

  rest(): void;
  drop(): void;

  color(g: CanvasRenderingContext2D): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;

  moveHorizontal(dx: number): void;
  moveVertical(dy: number): void;

  update(x: number, y: number): void;
}

class Air implements Tile {
  isAir() {
    return true;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}

  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }

  update(x: number, y: number): void {}
}
class Flux implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#ccffcc";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    moveToTile(playerx, playery + dy);
  }

  update(x: number, y: number): void {}
}
class Unbreakable implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#999999";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}

  update(x: number, y: number): void {}
}
class Player implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#ff0000";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}

  update(x: number, y: number): void {}
}
class Stone implements Tile {
  private fallStrategy: FallStrategy;
  constructor(private falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return this.falling.isFalling();
  }
  canFall() {
    return true;
  }

  rest(): void {
    this.falling = new Resting();
  }
  drop(): void {
    this.falling = new Falling();
  }

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#0000cc";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {
    this.falling.moveHorizontal(this, dx);
  }
  moveVertical(dy: number): void {}

  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
}

class Box implements Tile {
  private fallStrategy: FallStrategy;
  constructor(private falling: FallingState) {
    this.fallStrategy = new FallStrategy(falling);
  }

  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return this.falling.isFalling();
  }
  canFall() {
    return true;
  }

  rest(): void {
    this.falling = new Resting();
  }
  drop(): void {
    this.falling = new Falling();
  }

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#8b4513";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {
    this.falling.moveHorizontal(this, dx);
  }
  moveVertical(dy: number): void {}

  update(x: number, y: number): void {
    this.fallStrategy.update(this, x, y);
  }
}

class Key1 implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#ffcc00";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }

  update(x: number, y: number): void {}
}
class Lock1 implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return true;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#ffcc00";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}

  update(x: number, y: number): void {}
}
class Key2 implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return false;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#00ccff";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number): void {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }

  update(x: number, y: number): void {}
}
class Lock2 implements Tile {
  isAir() {
    return false;
  }
  isLock1() {
    return false;
  }
  isLock2() {
    return true;
  }

  isFalling(): boolean {
    return false;
  }
  canFall() {
    return false;
  }

  rest(): void {}
  drop(): void {}

  color(g: CanvasRenderingContext2D): void {
    g.fillStyle = "#00ccff";
  }
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(dx: number): void {}
  moveVertical(dy: number): void {}

  update(x: number, y: number): void {}
}

interface Input {
  handle(): void;
}

class Right implements Input {
  handle() {
    map[playery][playerx + 1].moveHorizontal(1);
  }
}

class Left implements Input {
  handle() {
    map[playery][playerx - 1].moveHorizontal(-1);
  }
}

class Up implements Input {
  handle() {
    map[playery - 1][playerx].moveVertical(-1);
  }
}

class Down implements Input {
  handle() {
    map[playery + 1][playerx].moveVertical(1);
  }
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];
let map: Tile[][] = [];

let inputs: Input[] = [];

function assertExhausted(x: never): never {
  throw new Error("Unexpected Object" + x);
}

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR:
      return new Air();
    case RawTile.FLUX:
      return new Flux();
    case RawTile.UNBREAKABLE:
      return new Unbreakable();
    case RawTile.PLAYER:
      return new Player();
    case RawTile.STONE:
      return new Stone(new Resting());
    case RawTile.FALLING_STONE:
      return new Stone(new Falling());
    case RawTile.BOX:
      return new Box(new Resting());
    case RawTile.FALLING_BOX:
      return new Box(new Falling());
    case RawTile.KEY1:
      return new Key1();
    case RawTile.LOCK1:
      return new Lock1();
    case RawTile.KEY2:
      return new Key2();
    case RawTile.LOCK2:
      return new Lock2();
    default:
      assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);

    for (let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x]);
    }
  }
}

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}
function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function update() {
  handleInputs();
  updateMap();
}

function handleInputs() {
  while (inputs.length > 0) {
    let input = inputs.pop();

    input.handle();
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].update(x, y);
    }
  }
}

function draw() {
  const graphics = createGraphics();
  drawMap(graphics);
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let graphics = canvas.getContext("2d");
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  return graphics;
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].color(g);
      map[y][x].draw(g, x, y);
    }
  }
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap();
  gameLoop();
};

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", (e) => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});
