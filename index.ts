interface FallingState {
  isFalling(): boolean;
  drop(tile: Tile, x: number, y: number): void;
  moveHorizontal(player: Player, tile: Tile, dx: number): void;
}

class Falling implements FallingState {
  isFalling() {
    return true;
  }
  drop(tile: Tile, x: number, y: number) {
    map[y + 1][x] = tile;
    map[y][x] = new Air();
  }
  moveHorizontal(player: Player, tile: Tile, dx: number) {}
}

class Resting implements FallingState {
  isFalling() {
    return false;
  }
  drop(tile: Tile, x: number, y: number) {}
  moveHorizontal(player: Player, tile: Tile, dx: number) {
    player.pushHorizontal(tile, dx);
  }
}

class FallingStrategy {
  constructor(private falling: FallingState) {}

  update(tile: Tile, x: number, y: number): void {
    this.falling = map[y + 1][x].getBlockOnTopState();
    this.falling.drop(tile, x, y);
  }

  moveHorizontal(player: Player, tile: Tile, dx: number): void {
    this.falling.moveHorizontal(player, tile, dx);
  }
}

class KeyConfiguration {
  constructor(private color: string, private _1: boolean, private removeStrategy: RemoveStrategy) {}

  setColor(g: CanvasRenderingContext2D) {
    g.fillStyle = this.color;
  }
  is1() {
    return this._1;
  }
  removeLock() {
    remove(this.removeStrategy);
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

  moveHorizontal(player: Player, dx: number): void;
  moveVertical(player: Player, dy: number): void;

  update(x: number, y: number): void;
  draw(g: CanvasRenderingContext2D, x: number, y: number): void;
}

class Air implements Tile {
  isAir() {
    return true;
  }
  isBox(): boolean {
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
  getBlockOnTopState(): FallingState {
    return new Falling();
  }

  moveHorizontal(player: Player, dx: number): void {
    player.move(dx, 0);
  }
  moveVertical(player: Player, dy: number): void {
    player.move(0, dy);
  }

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {}
}

class Flux implements Tile {
  isAir() {
    return false;
  }
  isBox(): boolean {
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  moveHorizontal(player: Player, dx: number): void {
    player.move(dx, 0);
  }
  moveVertical(player: Player, dy: number): void {
    player.move(0, dy);
  }

  update(x: number, y: number): void {}
}

class Unbreakable implements Tile {
  isAir() {
    return false;
  }
  isBox(): boolean {
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(player: Player, dx: number): void {}
  moveVertical(player: Player, dy: number): void {}

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
  isBox(): boolean {
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(player: Player, dx: number): void {}
  moveVertical(player: Player, dy: number): void {}

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
  isBox(): boolean {
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(player: Player, dx: number): void {
    this.fallingStrategy.moveHorizontal(player, this, dx);
  }
  moveVertical(player: Player, dy: number): void {}

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
  isBox(): boolean {
    return true;
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(player: Player, dx: number): void {
    this.fallingStrategy.moveHorizontal(player, this, dx);
  }
  moveVertical(player: Player, dy: number): void {}

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
  isBox(): boolean {
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
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(player: Player, dx: number): void {
    this.keyConf.removeLock();
    player.move(dx, 0);
  }
  moveVertical(player: Player, dy: number): void {
    this.keyConf.removeLock();
    player.move(0, dy);
  }

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

class Locked implements Tile {
  constructor(private keyConf: KeyConfiguration) {}

  isAir() {
    return false;
  }
  isBox(): boolean {
    return false;
  }
  isLock1() {
    return this.keyConf.is1();
  }
  isLock2() {
    return !this.keyConf.is1();
  }
  isFalling(): boolean {
    return false;
  }
  getBlockOnTopState(): FallingState {
    return new Resting();
  }

  moveHorizontal(player: Player, dx: number): void {}
  moveVertical(player: Player, dy: number): void {}

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

interface Input {
  handle(player: Player): void;
}

class Right implements Input {
  handle(player: Player) {
    player.moveHorizontal(1);
  }
}

class Left implements Input {
  handle(player: Player) {
    player.moveHorizontal(-1);
  }
}

class Up implements Input {
  handle(player: Player) {
    player.moveVertical(-1);
  }
}

class Down implements Input {
  handle(player: Player) {
    player.moveVertical(1);
  }
}

class Reset implements Input {
  handle(player: Player) {
    resetMap();
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
    this.moveToTile(this.x + dx, this.y + dy);
  }
  moveHorizontal(dx: number): void {
    map[this.y][this.x + dx].moveHorizontal(this, dx);
  }
  moveVertical(dy: number): void {
    map[this.y + dy][this.x].moveVertical(this, dy);
  }
  pushHorizontal(tile: Tile, dx: number): void {
    if (map[this.y][this.x + dx + dx].isAir() && !map[this.y + 1][this.x + dx].isAir()) {
      map[this.y][this.x + dx + dx] = tile;
      this.moveToTile(this.x + dx, this.y);
    }
  }

  private moveToTile(newX: number, newY: number) {
    map[this.y][this.x] = new Air();
    map[newY][newX] = new PlayerTile();
    this.x = newX;
    this.y = newY;
  }
}

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

const TILE_SIZE = 40;
const FPS = 30;
const SLEEP = 1000 / FPS;

const YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1());
const TEAL_KEY = new KeyConfiguration("#00ccff", false, new RemoveLock2());

const player = new Player();
let map: Tile[][] = [];
const inputs: Input[] = [];
const rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 1, 0, 2],
  [2, 4, 2, 6, 2, 2, 0, 2],
  [2, 8, 4, 1, 1, 11, 0, 2],
  [2, 4, 1, 1, 1, 9, 10, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

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
      return new PlayerTile();
    case RawTile.STONE:
      return new Stone(new Resting());
    case RawTile.FALLING_STONE:
      return new Stone(new Falling());
    case RawTile.BOX:
      return new Box(new Resting());
    case RawTile.FALLING_BOX:
      return new Box(new Falling());
    case RawTile.KEY1:
      return new Key(YELLOW_KEY);
    case RawTile.LOCK1:
      return new Locked(YELLOW_KEY);
    case RawTile.KEY2:
      return new Key(TEAL_KEY);
    case RawTile.LOCK2:
      return new Locked(TEAL_KEY);
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

function remove(removeStrategy: RemoveStrategy) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (removeStrategy.check(map[y][x])) {
        map[y][x] = new Air();
      }
    }
  }
}

function update() {
  handleInputs();
  updateMap();
}

function handleInputs() {
  while (inputs.length > 0) {
    let input = inputs.pop();
    input.handle(player);
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
      map[y][x].draw(g, x, y);
    }
  }
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  resetOnWin();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

function resetOnWin() {
  if (map[4][6].isBox()) {
    resetMap();
  }
}

function resetMap() {
  transformMap();
  player.reset();
}

window.onload = () => {
  transformMap();
  gameLoop();
};

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
const RESET_KEY = "r";
window.addEventListener("keydown", (e) => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
  else if (e.key === RESET_KEY) inputs.push(new Reset());
});
