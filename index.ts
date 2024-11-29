const TILE_SIZE = 40;
const FPS = 30;
const SLEEP = 1000 / FPS;
const rawMap: number[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 1, 0, 2],
  [2, 4, 2, 6, 2, 2, 0, 2],
  [2, 8, 4, 1, 1, 11, 0, 2],
  [2, 4, 1, 1, 1, 9, 10, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

interface RawTileValue {
  transform(): Tile;
}
class AirValue implements RawTileValue {
  transform(): Tile {
    return new Air();
  }
}
class FluxValue implements RawTileValue {
  transform(): Tile {
    return new Flux();
  }
}
class UnbreakableValue implements RawTileValue {
  transform(): Tile {
    return new Unbreakable();
  }
}
class PlayerValue implements RawTileValue {
  transform(): Tile {
    return new PlayerTile();
  }
}
class StoneValue implements RawTileValue {
  transform(): Tile {
    return new Stone(new Resting());
  }
}
class FallingStoneValue implements RawTileValue {
  transform(): Tile {
    return new Stone(new Falling());
  }
}
class BoxValue implements RawTileValue {
  transform(): Tile {
    return new Box(new Resting());
  }
}
class FallingBoxValue implements RawTileValue {
  transform(): Tile {
    return new Box(new Falling());
  }
}
class Key1Value implements RawTileValue {
  transform(): Tile {
    return new Key(YELLOW_KEY);
  }
}
class Lock1Value implements RawTileValue {
  transform(): Tile {
    return new Locked(YELLOW_KEY);
  }
}
class Key2Value implements RawTileValue {
  transform(): Tile {
    return new Key(TEAL_KEY);
  }
}
class Lock2Value implements RawTileValue {
  transform(): Tile {
    return new Locked(TEAL_KEY);
  }
}

class RawTile {
  private constructor(private value: RawTileValue) {}

  static readonly AIR = new RawTile(new AirValue());
  static readonly FLUX = new RawTile(new FluxValue());
  static readonly UNBREAKABLE = new RawTile(new UnbreakableValue());
  static readonly PLAYER = new RawTile(new PlayerValue());
  static readonly STONE = new RawTile(new StoneValue());
  static readonly FALLING_STONE = new RawTile(new FallingStoneValue());
  static readonly BOX = new RawTile(new BoxValue());
  static readonly FALLING_BOX = new RawTile(new FallingBoxValue());
  static readonly KEY1 = new RawTile(new Key1Value());
  static readonly LOCK1 = new RawTile(new Lock1Value());
  static readonly KEY2 = new RawTile(new Key2Value());
  static readonly LOCK2 = new RawTile(new Lock2Value());

  transform() {
    return this.value.transform();
  }
}

const RAW_TILES = [
  RawTile.AIR,
  RawTile.FLUX,
  RawTile.UNBREAKABLE,
  RawTile.PLAYER,
  RawTile.STONE,
  RawTile.FALLING_STONE,
  RawTile.BOX,
  RawTile.FALLING_BOX,
  RawTile.KEY1,
  RawTile.LOCK1,
  RawTile.KEY2,
  RawTile.LOCK2,
];

interface FallingState {
  isFalling(): boolean;
  drop(tile: Tile, x: number, y: number): void;
  moveHorizontal(map: Map, player: Player, tile: Tile, dx: number): void;
}

class Falling implements FallingState {
  isFalling() {
    return true;
  }
  drop(tile: Tile, x: number, y: number) {
    map.drop(tile, x, y);
  }
  moveHorizontal(map: Map, player: Player, tile: Tile, dx: number) {}
}

class Resting implements FallingState {
  isFalling() {
    return false;
  }
  drop(tile: Tile, x: number, y: number) {}
  moveHorizontal(map: Map, player: Player, tile: Tile, dx: number) {
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

  setColor(g: CanvasRenderingContext2D) {
    g.fillStyle = this.color;
  }
  is1() {
    return this._1;
  }
  removeLock() {
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

  moveHorizontal(map: Map, player: Player, dx: number): void {}
  moveVertical(map: Map, player: Player, dy: number): void {}

  update(x: number, y: number): void {}
  draw(g: CanvasRenderingContext2D, x: number, y: number): void {
    this.keyConf.setColor(g);
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
}

interface Input {
  handle(map: Map, player: Player): void;
}

class Right implements Input {
  handle(map: Map, player: Player) {
    player.moveHorizontal(map, 1);
  }
}

class Left implements Input {
  handle(map: Map, player: Player) {
    player.moveHorizontal(map, -1);
  }
}

class Up implements Input {
  handle(map: Map, player: Player) {
    player.moveVertical(map, -1);
  }
}

class Down implements Input {
  handle(map: Map, player: Player) {
    player.moveVertical(map, 1);
  }
}

class Reset implements Input {
  handle(map: Map, player: Player) {
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

  moveToTile(map: Map, newX: number, newY: number) {
    map.movePlayer(this.x, this.y, newX, newY);
    this.x = newX;
    this.y = newY;
  }
}

class Map {
  constructor() {
    this.transform();
  }
  private map: Tile[][] = [];

  isAir(x: number, y: number) {
    return this.map[y][x].isAir();
  }

  movePlayer(x: number, y: number, newX: number, newY: number) {
    this.map[y][x] = new Air();
    this.map[newY][newX] = new PlayerTile();
  }

  moveHorizontal(player: Player, x: number, y: number, dx: number) {
    this.map[y][x + dx].moveHorizontal(this, player, dx);
  }

  moveVertical(player: Player, x: number, y: number, dy: number) {
    this.map[y + dy][x].moveVertical(this, player, dy);
  }

  pushHorizontal(player: Player, tile: Tile, x: number, y: number, dx: number) {
    if (this.map[y][x + dx + dx].isAir() && !this.map[y][x + dx].isAir()) {
      this.map[y][x + dx + dx] = tile;
      player.moveToTile(this, x + dx, y);
    }
  }

  transform() {
    this.map = new Array(rawMap.length);
    for (let y = 0; y < rawMap.length; y++) {
      this.map[y] = new Array(rawMap[y].length);
      for (let x = 0; x < rawMap[y].length; x++) {
        this.map[y][x] = transformTile(RAW_TILES[rawMap[y][x]]);
      }
    }
  }

  update() {
    for (let y = this.map.length - 1; y >= 0; y--) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.map[y][x].update(x, y);
      }
    }
  }

  draw(g: CanvasRenderingContext2D) {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        this.map[y][x].draw(g, x, y);
      }
    }
  }

  drop(tile: Tile, x: number, y: number) {
    this.map[y + 1][x] = tile;
    this.map[y][x] = new Air();
  }

  getBlockOnTopState(x: number, y: number): FallingState {
    return this.map[y][x].getBlockOnTopState();
  }

  resetOnWin() {
    if (this.map[4][6].isBox()) {
      resetMap();
    }
  }

  remove(removeStrategy: RemoveStrategy) {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        if (removeStrategy.check(this.map[y][x])) {
          this.map[y][x] = new Air();
        }
      }
    }
  }
}

const YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1());
const TEAL_KEY = new KeyConfiguration("#00ccff", false, new RemoveLock2());

const player = new Player();
const map = new Map();
const inputs: Input[] = [];

function assertExhausted(x: never): never {
  throw new Error("Unexpected Object" + x);
}

function transformTile(tile: RawTile) {
  return tile.transform();
}

function update() {
  handleInputs();
  map.update();
}

function handleInputs() {
  while (inputs.length > 0) {
    let input = inputs.pop();
    input.handle(map, player);
  }
}

function draw() {
  const graphics = createGraphics();
  map.draw(graphics);
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let graphics = canvas.getContext("2d");
  graphics.clearRect(0, 0, canvas.width, canvas.height);
  return graphics;
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  map.resetOnWin();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

function resetMap() {
  map.transform();
  player.reset();
}

window.onload = () => {
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
