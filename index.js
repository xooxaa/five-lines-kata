var Falling = /** @class */ (function () {
    function Falling() {
    }
    Falling.prototype.isFalling = function () {
        return true;
    };
    Falling.prototype.drop = function (tile, x, y) {
        map[y + 1][x] = tile;
        map[y][x] = new Air();
    };
    Falling.prototype.moveHorizontal = function (player, tile, dx) { };
    return Falling;
}());
var Resting = /** @class */ (function () {
    function Resting() {
    }
    Resting.prototype.isFalling = function () {
        return false;
    };
    Resting.prototype.drop = function (tile, x, y) { };
    Resting.prototype.moveHorizontal = function (player, tile, dx) {
        player.pushHorizontal(tile, dx);
    };
    return Resting;
}());
var FallingStrategy = /** @class */ (function () {
    function FallingStrategy(falling) {
        this.falling = falling;
    }
    FallingStrategy.prototype.update = function (tile, x, y) {
        this.falling = map[y + 1][x].getBlockOnTopState();
        this.falling.drop(tile, x, y);
    };
    FallingStrategy.prototype.moveHorizontal = function (player, tile, dx) {
        this.falling.moveHorizontal(player, tile, dx);
    };
    return FallingStrategy;
}());
var KeyConfiguration = /** @class */ (function () {
    function KeyConfiguration(color, _1, removeStrategy) {
        this.color = color;
        this._1 = _1;
        this.removeStrategy = removeStrategy;
    }
    KeyConfiguration.prototype.setColor = function (g) {
        g.fillStyle = this.color;
    };
    KeyConfiguration.prototype.is1 = function () {
        return this._1;
    };
    KeyConfiguration.prototype.removeLock = function () {
        remove(this.removeStrategy);
    };
    return KeyConfiguration;
}());
var RemoveLock1 = /** @class */ (function () {
    function RemoveLock1() {
    }
    RemoveLock1.prototype.check = function (tile) {
        return tile.isLock1();
    };
    return RemoveLock1;
}());
var RemoveLock2 = /** @class */ (function () {
    function RemoveLock2() {
    }
    RemoveLock2.prototype.check = function (tile) {
        return tile.isLock2();
    };
    return RemoveLock2;
}());
var Air = /** @class */ (function () {
    function Air() {
    }
    Air.prototype.isAir = function () {
        return true;
    };
    Air.prototype.isBox = function () {
        return false;
    };
    Air.prototype.isLock1 = function () {
        return false;
    };
    Air.prototype.isLock2 = function () {
        return false;
    };
    Air.prototype.isFalling = function () {
        return false;
    };
    Air.prototype.getBlockOnTopState = function () {
        return new Falling();
    };
    Air.prototype.moveHorizontal = function (player, dx) {
        player.move(dx, 0);
    };
    Air.prototype.moveVertical = function (player, dy) {
        player.move(0, dy);
    };
    Air.prototype.update = function (x, y) { };
    Air.prototype.draw = function (g, x, y) { };
    return Air;
}());
var Flux = /** @class */ (function () {
    function Flux() {
    }
    Flux.prototype.isAir = function () {
        return false;
    };
    Flux.prototype.isBox = function () {
        return false;
    };
    Flux.prototype.isLock1 = function () {
        return false;
    };
    Flux.prototype.isLock2 = function () {
        return false;
    };
    Flux.prototype.isFalling = function () {
        return false;
    };
    Flux.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Flux.prototype.draw = function (g, x, y) {
        g.fillStyle = "#ccffcc";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Flux.prototype.moveHorizontal = function (player, dx) {
        player.move(dx, 0);
    };
    Flux.prototype.moveVertical = function (player, dy) {
        player.move(0, dy);
    };
    Flux.prototype.update = function (x, y) { };
    return Flux;
}());
var Unbreakable = /** @class */ (function () {
    function Unbreakable() {
    }
    Unbreakable.prototype.isAir = function () {
        return false;
    };
    Unbreakable.prototype.isBox = function () {
        return false;
    };
    Unbreakable.prototype.isLock1 = function () {
        return false;
    };
    Unbreakable.prototype.isLock2 = function () {
        return false;
    };
    Unbreakable.prototype.isFalling = function () {
        return false;
    };
    Unbreakable.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Unbreakable.prototype.moveHorizontal = function (player, dx) { };
    Unbreakable.prototype.moveVertical = function (player, dy) { };
    Unbreakable.prototype.update = function (x, y) { };
    Unbreakable.prototype.draw = function (g, x, y) {
        g.fillStyle = "#999999";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    return Unbreakable;
}());
var PlayerTile = /** @class */ (function () {
    function PlayerTile() {
    }
    PlayerTile.prototype.isAir = function () {
        return false;
    };
    PlayerTile.prototype.isBox = function () {
        return false;
    };
    PlayerTile.prototype.isLock1 = function () {
        return false;
    };
    PlayerTile.prototype.isLock2 = function () {
        return false;
    };
    PlayerTile.prototype.isFalling = function () {
        return false;
    };
    PlayerTile.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    PlayerTile.prototype.moveHorizontal = function (player, dx) { };
    PlayerTile.prototype.moveVertical = function (player, dy) { };
    PlayerTile.prototype.update = function (x, y) { };
    PlayerTile.prototype.draw = function (g, x, y) {
        g.fillStyle = "#ff0000";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    return PlayerTile;
}());
var Stone = /** @class */ (function () {
    function Stone(falling) {
        this.falling = falling;
        this.fallingStrategy = new FallingStrategy(this.falling);
    }
    Stone.prototype.isAir = function () {
        return false;
    };
    Stone.prototype.isBox = function () {
        return false;
    };
    Stone.prototype.isLock1 = function () {
        return false;
    };
    Stone.prototype.isLock2 = function () {
        return false;
    };
    Stone.prototype.isFalling = function () {
        return this.falling.isFalling();
    };
    Stone.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Stone.prototype.moveHorizontal = function (player, dx) {
        this.fallingStrategy.moveHorizontal(player, this, dx);
    };
    Stone.prototype.moveVertical = function (player, dy) { };
    Stone.prototype.update = function (x, y) {
        this.fallingStrategy.update(this, x, y);
    };
    Stone.prototype.draw = function (g, x, y) {
        g.fillStyle = "#0000cc";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    return Stone;
}());
var Box = /** @class */ (function () {
    function Box(falling) {
        this.falling = falling;
        this.fallingStrategy = new FallingStrategy(this.falling);
    }
    Box.prototype.isAir = function () {
        return false;
    };
    Box.prototype.isBox = function () {
        return true;
    };
    Box.prototype.isLock1 = function () {
        return false;
    };
    Box.prototype.isLock2 = function () {
        return false;
    };
    Box.prototype.isFalling = function () {
        return this.falling.isFalling();
    };
    Box.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Box.prototype.moveHorizontal = function (player, dx) {
        this.fallingStrategy.moveHorizontal(player, this, dx);
    };
    Box.prototype.moveVertical = function (player, dy) { };
    Box.prototype.update = function (x, y) {
        this.fallingStrategy.update(this, x, y);
    };
    Box.prototype.draw = function (g, x, y) {
        g.fillStyle = "#8b4513";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    return Box;
}());
var Key = /** @class */ (function () {
    function Key(keyConf) {
        this.keyConf = keyConf;
    }
    Key.prototype.isAir = function () {
        return false;
    };
    Key.prototype.isBox = function () {
        return false;
    };
    Key.prototype.isLock1 = function () {
        return false;
    };
    Key.prototype.isLock2 = function () {
        return false;
    };
    Key.prototype.isFalling = function () {
        return false;
    };
    Key.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Key.prototype.moveHorizontal = function (player, dx) {
        this.keyConf.removeLock();
        player.move(dx, 0);
    };
    Key.prototype.moveVertical = function (player, dy) {
        this.keyConf.removeLock();
        player.move(0, dy);
    };
    Key.prototype.update = function (x, y) { };
    Key.prototype.draw = function (g, x, y) {
        this.keyConf.setColor(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    return Key;
}());
var Locked = /** @class */ (function () {
    function Locked(keyConf) {
        this.keyConf = keyConf;
    }
    Locked.prototype.isAir = function () {
        return false;
    };
    Locked.prototype.isBox = function () {
        return false;
    };
    Locked.prototype.isLock1 = function () {
        return this.keyConf.is1();
    };
    Locked.prototype.isLock2 = function () {
        return !this.keyConf.is1();
    };
    Locked.prototype.isFalling = function () {
        return false;
    };
    Locked.prototype.getBlockOnTopState = function () {
        return new Resting();
    };
    Locked.prototype.moveHorizontal = function (player, dx) { };
    Locked.prototype.moveVertical = function (player, dy) { };
    Locked.prototype.update = function (x, y) { };
    Locked.prototype.draw = function (g, x, y) {
        this.keyConf.setColor(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    return Locked;
}());
var Right = /** @class */ (function () {
    function Right() {
    }
    Right.prototype.handle = function (player) {
        player.moveHorizontal(1);
    };
    return Right;
}());
var Left = /** @class */ (function () {
    function Left() {
    }
    Left.prototype.handle = function (player) {
        player.moveHorizontal(-1);
    };
    return Left;
}());
var Up = /** @class */ (function () {
    function Up() {
    }
    Up.prototype.handle = function (player) {
        player.moveVertical(-1);
    };
    return Up;
}());
var Down = /** @class */ (function () {
    function Down() {
    }
    Down.prototype.handle = function (player) {
        player.moveVertical(1);
    };
    return Down;
}());
var Reset = /** @class */ (function () {
    function Reset() {
    }
    Reset.prototype.handle = function (player) {
        resetMap();
    };
    return Reset;
}());
var Player = /** @class */ (function () {
    function Player() {
        this.x = 1;
        this.y = 1;
    }
    Player.prototype.reset = function () {
        this.x = 1;
        this.y = 1;
    };
    Player.prototype.move = function (dx, dy) {
        this.moveToTile(this.x + dx, this.y + dy);
    };
    Player.prototype.moveHorizontal = function (dx) {
        map[this.y][this.x + dx].moveHorizontal(this, dx);
    };
    Player.prototype.moveVertical = function (dy) {
        map[this.y + dy][this.x].moveVertical(this, dy);
    };
    Player.prototype.pushHorizontal = function (tile, dx) {
        if (map[this.y][this.x + dx + dx].isAir() && !map[this.y + 1][this.x + dx].isAir()) {
            map[this.y][this.x + dx + dx] = tile;
            this.moveToTile(this.x + dx, this.y);
        }
    };
    Player.prototype.moveToTile = function (newX, newY) {
        map[this.y][this.x] = new Air();
        map[newY][newX] = new PlayerTile();
        this.x = newX;
        this.y = newY;
    };
    return Player;
}());
var RawTile;
(function (RawTile) {
    RawTile[RawTile["AIR"] = 0] = "AIR";
    RawTile[RawTile["FLUX"] = 1] = "FLUX";
    RawTile[RawTile["UNBREAKABLE"] = 2] = "UNBREAKABLE";
    RawTile[RawTile["PLAYER"] = 3] = "PLAYER";
    RawTile[RawTile["STONE"] = 4] = "STONE";
    RawTile[RawTile["FALLING_STONE"] = 5] = "FALLING_STONE";
    RawTile[RawTile["BOX"] = 6] = "BOX";
    RawTile[RawTile["FALLING_BOX"] = 7] = "FALLING_BOX";
    RawTile[RawTile["KEY1"] = 8] = "KEY1";
    RawTile[RawTile["LOCK1"] = 9] = "LOCK1";
    RawTile[RawTile["KEY2"] = 10] = "KEY2";
    RawTile[RawTile["LOCK2"] = 11] = "LOCK2";
})(RawTile || (RawTile = {}));
var TILE_SIZE = 40;
var FPS = 30;
var SLEEP = 1000 / FPS;
var YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1());
var TEAL_KEY = new KeyConfiguration("#00ccff", false, new RemoveLock2());
var player = new Player();
var map = [];
var inputs = [];
var rawMap = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 1, 0, 2],
    [2, 4, 2, 6, 2, 2, 0, 2],
    [2, 8, 4, 1, 1, 11, 0, 2],
    [2, 4, 1, 1, 1, 9, 10, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
];
function assertExhausted(x) {
    throw new Error("Unexpected Object" + x);
}
function transformTile(tile) {
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
    for (var y = 0; y < rawMap.length; y++) {
        map[y] = new Array(rawMap[y].length);
        for (var x = 0; x < rawMap[y].length; x++) {
            map[y][x] = transformTile(rawMap[y][x]);
        }
    }
}
function remove(removeStrategy) {
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
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
        var input = inputs.pop();
        input.handle(player);
    }
}
function updateMap() {
    for (var y = map.length - 1; y >= 0; y--) {
        for (var x = 0; x < map[y].length; x++) {
            map[y][x].update(x, y);
        }
    }
}
function draw() {
    var graphics = createGraphics();
    drawMap(graphics);
}
function createGraphics() {
    var canvas = document.getElementById("GameCanvas");
    var graphics = canvas.getContext("2d");
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    return graphics;
}
function drawMap(g) {
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            map[y][x].draw(g, x, y);
        }
    }
}
function gameLoop() {
    var before = Date.now();
    update();
    draw();
    resetOnWin();
    var after = Date.now();
    var frameTime = after - before;
    var sleep = SLEEP - frameTime;
    setTimeout(function () { return gameLoop(); }, sleep);
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
window.onload = function () {
    transformMap();
    gameLoop();
};
var LEFT_KEY = "ArrowLeft";
var UP_KEY = "ArrowUp";
var RIGHT_KEY = "ArrowRight";
var DOWN_KEY = "ArrowDown";
var RESET_KEY = "r";
window.addEventListener("keydown", function (e) {
    if (e.key === LEFT_KEY || e.key === "a")
        inputs.push(new Left());
    else if (e.key === UP_KEY || e.key === "w")
        inputs.push(new Up());
    else if (e.key === RIGHT_KEY || e.key === "d")
        inputs.push(new Right());
    else if (e.key === DOWN_KEY || e.key === "s")
        inputs.push(new Down());
    else if (e.key === RESET_KEY)
        inputs.push(new Reset());
});
