var RawTileFactory = /** @class */ (function () {
    function RawTileFactory() {
    }
    RawTileFactory.createTile = function (rawValue) {
        var tileFactory = this.TILE_MAPPING[rawValue];
        if (!tileFactory) {
            throw new Error("No Tile mapped for raw value: ".concat(rawValue));
        }
        return tileFactory();
    };
    RawTileFactory.TILE_MAPPING = {
        0: function () { return new Air(); },
        1: function () { return new Flux(); },
        2: function () { return new Unbreakable(); },
        3: function () { return new PlayerTile(); },
        4: function () { return new Stone(new Resting()); },
        5: function () { return new Stone(new Falling()); },
        6: function () { return new Box(new Resting()); },
        7: function () { return new Box(new Falling()); },
        8: function () { return new Key(YELLOW_KEY); },
        9: function () { return new Locked(YELLOW_KEY); },
        10: function () { return new Key(TEAL_KEY); },
        11: function () { return new Locked(TEAL_KEY); },
    };
    return RawTileFactory;
}());
var Falling = /** @class */ (function () {
    function Falling() {
    }
    Falling.prototype.isFalling = function () {
        return true;
    };
    Falling.prototype.drop = function (tile, x, y) {
        game.drop(tile, x, y);
    };
    Falling.prototype.moveHorizontal = function (game, tile, dx) { };
    return Falling;
}());
var Resting = /** @class */ (function () {
    function Resting() {
    }
    Resting.prototype.isFalling = function () {
        return false;
    };
    Resting.prototype.drop = function (tile, x, y) { };
    Resting.prototype.moveHorizontal = function (game, tile, dx) {
        game.pushHorizontal(tile, dx);
    };
    return Resting;
}());
var FallingStrategy = /** @class */ (function () {
    function FallingStrategy(falling) {
        this.falling = falling;
    }
    FallingStrategy.prototype.update = function (tile, x, y) {
        this.falling = game.getBlockOnTopState(x, y + 1);
        this.falling.drop(tile, x, y);
    };
    FallingStrategy.prototype.moveHorizontal = function (game, tile, dx) {
        this.falling.moveHorizontal(game, tile, dx);
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
        game.removeLock(this.removeStrategy);
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
    Air.prototype.moveHorizontal = function (game, dx) {
        game.movePlayer(dx, 0);
    };
    Air.prototype.moveVertical = function (game, dy) {
        game.movePlayer(0, dy);
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
    Flux.prototype.moveHorizontal = function (game, dx) {
        game.movePlayer(dx, 0);
    };
    Flux.prototype.moveVertical = function (game, dy) {
        game.movePlayer(0, dy);
    };
    Flux.prototype.update = function (x, y) { };
    Flux.prototype.draw = function (g, x, y) {
        g.fillStyle = "#ccffcc";
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
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
    Unbreakable.prototype.moveHorizontal = function (game, dx) { };
    Unbreakable.prototype.moveVertical = function (game, dy) { };
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
    PlayerTile.prototype.moveHorizontal = function (game, dx) { };
    PlayerTile.prototype.moveVertical = function (game, dy) { };
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
    Stone.prototype.moveHorizontal = function (game, dx) {
        this.fallingStrategy.moveHorizontal(game, this, dx);
    };
    Stone.prototype.moveVertical = function (game, dy) { };
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
    Box.prototype.moveHorizontal = function (game, dx) {
        this.fallingStrategy.moveHorizontal(game, this, dx);
    };
    Box.prototype.moveVertical = function (game, dy) { };
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
    Key.prototype.moveHorizontal = function (game, dx) {
        this.keyConf.removeLock();
        game.movePlayer(dx, 0);
    };
    Key.prototype.moveVertical = function (game, dy) {
        this.keyConf.removeLock();
        game.movePlayer(0, dy);
    };
    Key.prototype.update = function (x, y) { };
    Key.prototype.draw = function (g, x, y) {
        this.keyConf.setColor(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        g.font = "".concat(TILE_SIZE / 3, "px Arial");
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = "black";
        g.fillText("KEY", x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
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
    Locked.prototype.moveHorizontal = function (game, dx) { };
    Locked.prototype.moveVertical = function (game, dy) { };
    Locked.prototype.update = function (x, y) { };
    Locked.prototype.draw = function (g, x, y) {
        this.keyConf.setColor(g);
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        g.font = "".concat(TILE_SIZE / 4, "px Arial");
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillStyle = "black";
        g.fillText("LOCK", x * TILE_SIZE + TILE_SIZE / 2, y * TILE_SIZE + TILE_SIZE / 2);
    };
    return Locked;
}());
var Right = /** @class */ (function () {
    function Right() {
    }
    Right.prototype.handle = function (game) {
        game.moveHorizontal(1);
    };
    return Right;
}());
var Left = /** @class */ (function () {
    function Left() {
    }
    Left.prototype.handle = function (game) {
        game.moveHorizontal(-1);
    };
    return Left;
}());
var Up = /** @class */ (function () {
    function Up() {
    }
    Up.prototype.handle = function (game) {
        game.moveVertical(-1);
    };
    return Up;
}());
var Down = /** @class */ (function () {
    function Down() {
    }
    Down.prototype.handle = function (game) {
        game.moveVertical(1);
    };
    return Down;
}());
var Reset = /** @class */ (function () {
    function Reset() {
    }
    Reset.prototype.handle = function (game) {
        game.reset();
    };
    return Reset;
}());
var Game = /** @class */ (function () {
    function Game(rawMap) {
        this.rawMap = rawMap;
        this.playerX = 1;
        this.playerY = 1;
        this.map = [];
        this.transform(this.rawMap);
    }
    Game.prototype.transform = function (rawMap) {
        this.map = rawMap.map(function (row) { return row.map(function (value) { return RawTileFactory.createTile(value); }); });
    };
    Game.prototype.isAir = function (x, y) {
        return this.map[y][x].isAir();
    };
    Game.prototype.moveHorizontal = function (dx) {
        this.map[this.playerY][this.playerX + dx].moveHorizontal(this, dx);
    };
    Game.prototype.moveVertical = function (dy) {
        this.map[this.playerY + dy][this.playerX].moveVertical(this, dy);
    };
    Game.prototype.movePlayer = function (dx, dy) {
        var newX = this.playerX + dx;
        var newY = this.playerY + dy;
        this.map[this.playerY][this.playerX] = new Air();
        this.map[newY][newX] = new PlayerTile();
        this.playerX = newX;
        this.playerY = newY;
    };
    Game.prototype.pushHorizontal = function (tile, dx) {
        if (this.map[this.playerY][this.playerX + dx + dx].isAir() && !this.map[this.playerY][this.playerX + dx].isAir()) {
            this.map[this.playerY][this.playerX + dx + dx] = tile;
            this.movePlayer(dx, 0);
        }
    };
    Game.prototype.update = function () {
        for (var y = this.map.length - 1; y >= 0; y--) {
            for (var x = 0; x < this.map[y].length; x++) {
                this.map[y][x].update(x, y);
            }
        }
    };
    Game.prototype.removeLock = function (removeStrategy) {
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                if (removeStrategy.check(this.map[y][x])) {
                    this.map[y][x] = new Air();
                }
            }
        }
    };
    Game.prototype.draw = function (g) {
        for (var y = 0; y < this.map.length; y++) {
            for (var x = 0; x < this.map[y].length; x++) {
                this.map[y][x].draw(g, x, y);
            }
        }
    };
    Game.prototype.drop = function (tile, x, y) {
        this.map[y + 1][x] = tile;
        this.map[y][x] = new Air();
    };
    Game.prototype.getBlockOnTopState = function (x, y) {
        return this.map[y][x].getBlockOnTopState();
    };
    Game.prototype.reset = function () {
        this.transform(rawMap);
        this.playerX = 1;
        this.playerY = 1;
    };
    Game.prototype.resetOnWin = function () {
        if (this.map[4][6].isBox()) {
            this.reset();
        }
    };
    return Game;
}());
var TILE_SIZE = 40;
var FPS = 30;
var SLEEP = 1000 / FPS;
var YELLOW_KEY = new KeyConfiguration("#ffcc00", true, new RemoveLock1());
var TEAL_KEY = new KeyConfiguration("#00ccff", false, new RemoveLock2());
var rawMap = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 1, 0, 2],
    [2, 4, 2, 6, 2, 2, 0, 2],
    [2, 8, 4, 1, 1, 11, 0, 2],
    [2, 4, 1, 1, 1, 9, 10, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
];
var game = new Game(rawMap);
var inputs = [];
function handleInputs() {
    while (inputs.length > 0) {
        var input = inputs.pop();
        input.handle(game);
    }
}
function createGraphics() {
    var canvas = document.getElementById("GameCanvas");
    var graphics = canvas.getContext("2d");
    graphics.clearRect(0, 0, canvas.width, canvas.height);
    return graphics;
}
function update() {
    handleInputs();
    game.update();
}
function draw() {
    var graphics = createGraphics();
    game.draw(graphics);
}
function gameLoop() {
    var before = Date.now();
    update();
    draw();
    game.resetOnWin();
    var after = Date.now();
    var frameTime = after - before;
    var sleep = SLEEP - frameTime;
    setTimeout(function () { return gameLoop(); }, sleep);
}
window.onload = function () {
    gameLoop();
};
window.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft" || e.key === "a")
        inputs.push(new Left());
    else if (e.key === "ArrowUp" || e.key === "w")
        inputs.push(new Up());
    else if (e.key === "ArrowRight" || e.key === "d")
        inputs.push(new Right());
    else if (e.key === "ArrowDown" || e.key === "s")
        inputs.push(new Down());
    else if (e.key === "r")
        inputs.push(new Reset());
});
