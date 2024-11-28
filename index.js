var TILE_SIZE = 32;
var FPS = 30;
var SLEEP = 1000 / FPS;
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
var Falling = /** @class */ (function () {
    function Falling() {
    }
    Falling.prototype.isFalling = function () {
        return true;
    };
    Falling.prototype.moveHorizontal = function (tile, dx) { };
    return Falling;
}());
var Resting = /** @class */ (function () {
    function Resting() {
    }
    Resting.prototype.isFalling = function () {
        return false;
    };
    Resting.prototype.moveHorizontal = function (tile, dx) {
        if (map[playery][playerx + dx + dx].isAir() && !map[playery + 1][playerx + dx].isAir()) {
            map[playery][playerx + dx + dx] = tile;
            moveToTile(playerx + dx, playery);
        }
    };
    return Resting;
}());
var Air = /** @class */ (function () {
    function Air() {
    }
    Air.prototype.isAir = function () {
        return true;
    };
    Air.prototype.isFlux = function () {
        return false;
    };
    Air.prototype.isUnbreakable = function () {
        return false;
    };
    Air.prototype.isPlayer = function () {
        return false;
    };
    Air.prototype.isStone = function () {
        return false;
    };
    Air.prototype.isFallingStone = function () {
        return false;
    };
    Air.prototype.isBox = function () {
        return false;
    };
    Air.prototype.isFallingBox = function () {
        return false;
    };
    Air.prototype.isKey1 = function () {
        return false;
    };
    Air.prototype.isLock1 = function () {
        return false;
    };
    Air.prototype.isKey2 = function () {
        return false;
    };
    Air.prototype.isLock2 = function () {
        return false;
    };
    Air.prototype.isEdible = function () {
        return true;
    };
    Air.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Air.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Air.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Air.prototype.rest = function () { };
    Air.prototype.drop = function () { };
    Air.prototype.color = function (g) { };
    Air.prototype.draw = function (g, x, y) { };
    Air.prototype.moveHorizontal = function (dx) {
        moveToTile(playerx + dx, playery);
    };
    Air.prototype.moveVertical = function (dy) {
        moveToTile(playerx, playery + dy);
    };
    Air.prototype.update = function (x, y) { };
    return Air;
}());
var Flux = /** @class */ (function () {
    function Flux() {
    }
    Flux.prototype.isAir = function () {
        return false;
    };
    Flux.prototype.isFlux = function () {
        return true;
    };
    Flux.prototype.isUnbreakable = function () {
        return false;
    };
    Flux.prototype.isPlayer = function () {
        return false;
    };
    Flux.prototype.isStone = function () {
        return false;
    };
    Flux.prototype.isFallingStone = function () {
        return false;
    };
    Flux.prototype.isBox = function () {
        return false;
    };
    Flux.prototype.isFallingBox = function () {
        return false;
    };
    Flux.prototype.isKey1 = function () {
        return false;
    };
    Flux.prototype.isLock1 = function () {
        return false;
    };
    Flux.prototype.isKey2 = function () {
        return false;
    };
    Flux.prototype.isLock2 = function () {
        return false;
    };
    Flux.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Flux.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Flux.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Flux.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Flux.prototype.rest = function () { };
    Flux.prototype.drop = function () { };
    Flux.prototype.color = function (g) {
        g.fillStyle = "#ccffcc";
    };
    Flux.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Flux.prototype.moveHorizontal = function (dx) {
        moveToTile(playerx + dx, playery);
    };
    Flux.prototype.moveVertical = function (dy) {
        moveToTile(playerx, playery + dy);
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
    Unbreakable.prototype.isFlux = function () {
        return false;
    };
    Unbreakable.prototype.isUnbreakable = function () {
        return true;
    };
    Unbreakable.prototype.isPlayer = function () {
        return false;
    };
    Unbreakable.prototype.isStone = function () {
        return false;
    };
    Unbreakable.prototype.isFallingStone = function () {
        return false;
    };
    Unbreakable.prototype.isBox = function () {
        return false;
    };
    Unbreakable.prototype.isFallingBox = function () {
        return false;
    };
    Unbreakable.prototype.isKey1 = function () {
        return false;
    };
    Unbreakable.prototype.isLock1 = function () {
        return false;
    };
    Unbreakable.prototype.isKey2 = function () {
        return false;
    };
    Unbreakable.prototype.isLock2 = function () {
        return false;
    };
    Unbreakable.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Unbreakable.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Unbreakable.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Unbreakable.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Unbreakable.prototype.rest = function () { };
    Unbreakable.prototype.drop = function () { };
    Unbreakable.prototype.color = function (g) {
        g.fillStyle = "#999999";
    };
    Unbreakable.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Unbreakable.prototype.moveHorizontal = function (dx) { };
    Unbreakable.prototype.moveVertical = function (dy) { };
    Unbreakable.prototype.update = function (x, y) { };
    return Unbreakable;
}());
var Player = /** @class */ (function () {
    function Player() {
    }
    Player.prototype.isAir = function () {
        return false;
    };
    Player.prototype.isFlux = function () {
        return false;
    };
    Player.prototype.isUnbreakable = function () {
        return false;
    };
    Player.prototype.isPlayer = function () {
        return true;
    };
    Player.prototype.isStone = function () {
        return false;
    };
    Player.prototype.isFallingStone = function () {
        return false;
    };
    Player.prototype.isBox = function () {
        return false;
    };
    Player.prototype.isFallingBox = function () {
        return false;
    };
    Player.prototype.isKey1 = function () {
        return false;
    };
    Player.prototype.isLock1 = function () {
        return false;
    };
    Player.prototype.isKey2 = function () {
        return false;
    };
    Player.prototype.isLock2 = function () {
        return false;
    };
    Player.prototype.isEdible = function () {
        return true;
    };
    Player.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Player.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Player.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Player.prototype.rest = function () { };
    Player.prototype.drop = function () { };
    Player.prototype.color = function (g) {
        g.fillStyle = "#ff0000";
    };
    Player.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Player.prototype.moveHorizontal = function (dx) { };
    Player.prototype.moveVertical = function (dy) { };
    Player.prototype.update = function (x, y) { };
    return Player;
}());
var Stone = /** @class */ (function () {
    function Stone(falling) {
        this.falling = falling;
    }
    Stone.prototype.isAir = function () {
        return false;
    };
    Stone.prototype.isFlux = function () {
        return false;
    };
    Stone.prototype.isUnbreakable = function () {
        return false;
    };
    Stone.prototype.isPlayer = function () {
        return false;
    };
    Stone.prototype.isStone = function () {
        return true;
    };
    Stone.prototype.isFallingStone = function () {
        return this.falling.isFalling();
    };
    Stone.prototype.isBox = function () {
        return false;
    };
    Stone.prototype.isFallingBox = function () {
        return false;
    };
    Stone.prototype.isKey1 = function () {
        return false;
    };
    Stone.prototype.isLock1 = function () {
        return false;
    };
    Stone.prototype.isKey2 = function () {
        return false;
    };
    Stone.prototype.isLock2 = function () {
        return false;
    };
    Stone.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Stone.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Stone.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Stone.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Stone.prototype.rest = function () {
        this.falling = new Resting();
    };
    Stone.prototype.drop = function () {
        this.falling = new Falling();
    };
    Stone.prototype.color = function (g) {
        g.fillStyle = "#0000cc";
    };
    Stone.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Stone.prototype.moveHorizontal = function (dx) {
        this.falling.moveHorizontal(this, dx);
    };
    Stone.prototype.moveVertical = function (dy) { };
    Stone.prototype.update = function (x, y) {
        if (map[y + 1][x].isAir()) {
            this.falling = new Falling();
            map[y + 1][x] = this;
            map[y][x] = new Air();
        }
        else if (this.falling.isFalling()) {
            this.falling = new Resting();
        }
    };
    return Stone;
}());
var Box = /** @class */ (function () {
    function Box(falling) {
        this.falling = falling;
    }
    Box.prototype.isAir = function () {
        return false;
    };
    Box.prototype.isFlux = function () {
        return false;
    };
    Box.prototype.isUnbreakable = function () {
        return false;
    };
    Box.prototype.isPlayer = function () {
        return false;
    };
    Box.prototype.isStone = function () {
        return false;
    };
    Box.prototype.isFallingStone = function () {
        return false;
    };
    Box.prototype.isBox = function () {
        return true;
    };
    Box.prototype.isFallingBox = function () {
        return this.falling.isFalling();
    };
    Box.prototype.isKey1 = function () {
        return false;
    };
    Box.prototype.isLock1 = function () {
        return false;
    };
    Box.prototype.isKey2 = function () {
        return false;
    };
    Box.prototype.isLock2 = function () {
        return false;
    };
    Box.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Box.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Box.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Box.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Box.prototype.rest = function () {
        this.falling = new Resting();
    };
    Box.prototype.drop = function () {
        this.falling = new Falling();
    };
    Box.prototype.color = function (g) {
        g.fillStyle = "#8b4513";
    };
    Box.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Box.prototype.moveHorizontal = function (dx) {
        this.falling.moveHorizontal(this, dx);
    };
    Box.prototype.moveVertical = function (dy) { };
    Box.prototype.update = function (x, y) {
        if (map[y + 1][x].isAir()) {
            this.falling = new Falling();
            map[y + 1][x] = this;
            map[y][x] = new Air();
        }
        else if (this.falling.isFalling()) {
            this.falling = new Resting();
        }
    };
    return Box;
}());
var Key1 = /** @class */ (function () {
    function Key1() {
    }
    Key1.prototype.isAir = function () {
        return false;
    };
    Key1.prototype.isFlux = function () {
        return false;
    };
    Key1.prototype.isUnbreakable = function () {
        return false;
    };
    Key1.prototype.isPlayer = function () {
        return false;
    };
    Key1.prototype.isStone = function () {
        return false;
    };
    Key1.prototype.isFallingStone = function () {
        return false;
    };
    Key1.prototype.isBox = function () {
        return false;
    };
    Key1.prototype.isFallingBox = function () {
        return false;
    };
    Key1.prototype.isKey1 = function () {
        return true;
    };
    Key1.prototype.isLock1 = function () {
        return false;
    };
    Key1.prototype.isKey2 = function () {
        return false;
    };
    Key1.prototype.isLock2 = function () {
        return false;
    };
    Key1.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Key1.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Key1.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Key1.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Key1.prototype.rest = function () { };
    Key1.prototype.drop = function () { };
    Key1.prototype.color = function (g) {
        g.fillStyle = "#ffcc00";
    };
    Key1.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Key1.prototype.moveHorizontal = function (dx) {
        removeLock1();
        moveToTile(playerx + dx, playery);
    };
    Key1.prototype.moveVertical = function (dy) {
        removeLock1();
        moveToTile(playerx, playery + dy);
    };
    Key1.prototype.update = function (x, y) { };
    return Key1;
}());
var Lock1 = /** @class */ (function () {
    function Lock1() {
    }
    Lock1.prototype.isAir = function () {
        return false;
    };
    Lock1.prototype.isFlux = function () {
        return false;
    };
    Lock1.prototype.isUnbreakable = function () {
        return false;
    };
    Lock1.prototype.isPlayer = function () {
        return false;
    };
    Lock1.prototype.isStone = function () {
        return false;
    };
    Lock1.prototype.isFallingStone = function () {
        return false;
    };
    Lock1.prototype.isBox = function () {
        return false;
    };
    Lock1.prototype.isFallingBox = function () {
        return false;
    };
    Lock1.prototype.isKey1 = function () {
        return false;
    };
    Lock1.prototype.isLock1 = function () {
        return true;
    };
    Lock1.prototype.isKey2 = function () {
        return false;
    };
    Lock1.prototype.isLock2 = function () {
        return false;
    };
    Lock1.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Lock1.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Lock1.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Lock1.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Lock1.prototype.rest = function () { };
    Lock1.prototype.drop = function () { };
    Lock1.prototype.color = function (g) {
        g.fillStyle = "#ffcc00";
    };
    Lock1.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Lock1.prototype.moveHorizontal = function (dx) { };
    Lock1.prototype.moveVertical = function (dy) { };
    Lock1.prototype.update = function (x, y) { };
    return Lock1;
}());
var Key2 = /** @class */ (function () {
    function Key2() {
    }
    Key2.prototype.isAir = function () {
        return false;
    };
    Key2.prototype.isFlux = function () {
        return false;
    };
    Key2.prototype.isUnbreakable = function () {
        return false;
    };
    Key2.prototype.isPlayer = function () {
        return false;
    };
    Key2.prototype.isStone = function () {
        return false;
    };
    Key2.prototype.isFallingStone = function () {
        return false;
    };
    Key2.prototype.isBox = function () {
        return false;
    };
    Key2.prototype.isFallingBox = function () {
        return false;
    };
    Key2.prototype.isKey1 = function () {
        return false;
    };
    Key2.prototype.isLock1 = function () {
        return false;
    };
    Key2.prototype.isKey2 = function () {
        return true;
    };
    Key2.prototype.isLock2 = function () {
        return false;
    };
    Key2.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Key2.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Key2.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Key2.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Key2.prototype.rest = function () { };
    Key2.prototype.drop = function () { };
    Key2.prototype.color = function (g) {
        g.fillStyle = "#00ccff";
    };
    Key2.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Key2.prototype.moveHorizontal = function (dx) {
        removeLock2();
        moveToTile(playerx + dx, playery);
    };
    Key2.prototype.moveVertical = function (dy) {
        removeLock2();
        moveToTile(playerx, playery + dy);
    };
    Key2.prototype.update = function (x, y) { };
    return Key2;
}());
var Lock2 = /** @class */ (function () {
    function Lock2() {
    }
    Lock2.prototype.isAir = function () {
        return false;
    };
    Lock2.prototype.isFlux = function () {
        return false;
    };
    Lock2.prototype.isUnbreakable = function () {
        return false;
    };
    Lock2.prototype.isPlayer = function () {
        return false;
    };
    Lock2.prototype.isStone = function () {
        return false;
    };
    Lock2.prototype.isFallingStone = function () {
        return false;
    };
    Lock2.prototype.isBox = function () {
        return false;
    };
    Lock2.prototype.isFallingBox = function () {
        return false;
    };
    Lock2.prototype.isKey1 = function () {
        return false;
    };
    Lock2.prototype.isLock1 = function () {
        return false;
    };
    Lock2.prototype.isKey2 = function () {
        return false;
    };
    Lock2.prototype.isLock2 = function () {
        return true;
    };
    Lock2.prototype.isEdible = function () {
        return this.isFlux() || this.isAir();
    };
    Lock2.prototype.isPushable = function () {
        return this.isStone() || this.isBox();
    };
    Lock2.prototype.isFalling = function () {
        return this.isFallingStone() || this.isFallingBox();
    };
    Lock2.prototype.canFall = function () {
        return this.isStone() || this.isBox();
    };
    Lock2.prototype.rest = function () { };
    Lock2.prototype.drop = function () { };
    Lock2.prototype.color = function (g) {
        g.fillStyle = "#00ccff";
    };
    Lock2.prototype.draw = function (g, x, y) {
        g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    };
    Lock2.prototype.moveHorizontal = function (dx) { };
    Lock2.prototype.moveVertical = function (dy) { };
    Lock2.prototype.update = function (x, y) { };
    return Lock2;
}());
var Right = /** @class */ (function () {
    function Right() {
    }
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    Right.prototype.isUp = function () {
        return false;
    };
    Right.prototype.isDown = function () {
        return false;
    };
    Right.prototype.handle = function () {
        map[playery][playerx + 1].moveHorizontal(1);
    };
    return Right;
}());
var Left = /** @class */ (function () {
    function Left() {
    }
    Left.prototype.isRight = function () {
        return false;
    };
    Left.prototype.isLeft = function () {
        return true;
    };
    Left.prototype.isUp = function () {
        return false;
    };
    Left.prototype.isDown = function () {
        return false;
    };
    Left.prototype.handle = function () {
        map[playery][playerx - 1].moveHorizontal(-1);
    };
    return Left;
}());
var Up = /** @class */ (function () {
    function Up() {
    }
    Up.prototype.isRight = function () {
        return false;
    };
    Up.prototype.isLeft = function () {
        return false;
    };
    Up.prototype.isUp = function () {
        return true;
    };
    Up.prototype.isDown = function () {
        return false;
    };
    Up.prototype.handle = function () {
        map[playery - 1][playerx].moveVertical(-1);
    };
    return Up;
}());
var Down = /** @class */ (function () {
    function Down() {
    }
    Down.prototype.isRight = function () {
        return false;
    };
    Down.prototype.isLeft = function () {
        return false;
    };
    Down.prototype.isUp = function () {
        return false;
    };
    Down.prototype.isDown = function () {
        return true;
    };
    Down.prototype.handle = function () {
        map[playery + 1][playerx].moveVertical(1);
    };
    return Down;
}());
var playerx = 1;
var playery = 1;
var rawMap = [
    [2, 2, 2, 2, 2, 2, 2, 2],
    [2, 3, 0, 1, 1, 2, 0, 2],
    [2, 4, 2, 6, 1, 2, 0, 2],
    [2, 8, 4, 1, 1, 2, 0, 2],
    [2, 4, 1, 1, 1, 9, 0, 2],
    [2, 2, 2, 2, 2, 2, 2, 2],
];
var map = [];
var inputs = [];
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
    for (var y = 0; y < rawMap.length; y++) {
        map[y] = new Array(rawMap[y].length);
        for (var x = 0; x < rawMap[y].length; x++) {
            map[y][x] = transformTile(rawMap[y][x]);
        }
    }
}
function removeLock1() {
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            if (map[y][x].isLock1()) {
                map[y][x] = new Air();
            }
        }
    }
}
function removeLock2() {
    for (var y = 0; y < map.length; y++) {
        for (var x = 0; x < map[y].length; x++) {
            if (map[y][x].isLock2()) {
                map[y][x] = new Air();
            }
        }
    }
}
function moveToTile(newx, newy) {
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
        var input = inputs.pop();
        input.handle();
    }
}
function updateMap() {
    for (var y = map.length - 1; y >= 0; y--) {
        for (var x = 0; x < map[y].length; x++) {
            updateTile(x, y);
        }
    }
}
function updateTile(x, y) {
    map[y][x].update(x, y);
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
            map[y][x].color(g);
            map[y][x].draw(g, x, y);
        }
    }
}
function gameLoop() {
    var before = Date.now();
    update();
    draw();
    var after = Date.now();
    var frameTime = after - before;
    var sleep = SLEEP - frameTime;
    setTimeout(function () { return gameLoop(); }, sleep);
}
window.onload = function () {
    transformMap();
    gameLoop();
};
var LEFT_KEY = "ArrowLeft";
var UP_KEY = "ArrowUp";
var RIGHT_KEY = "ArrowRight";
var DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", function (e) {
    if (e.key === LEFT_KEY || e.key === "a")
        inputs.push(new Left());
    else if (e.key === UP_KEY || e.key === "w")
        inputs.push(new Up());
    else if (e.key === RIGHT_KEY || e.key === "d")
        inputs.push(new Right());
    else if (e.key === DOWN_KEY || e.key === "s")
        inputs.push(new Down());
});
