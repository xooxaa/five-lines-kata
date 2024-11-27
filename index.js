var TILE_SIZE = 30;
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
    return Player;
}());
var Stone = /** @class */ (function () {
    function Stone() {
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
        return false;
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
    return Stone;
}());
var FallingStone = /** @class */ (function () {
    function FallingStone() {
    }
    FallingStone.prototype.isAir = function () {
        return false;
    };
    FallingStone.prototype.isFlux = function () {
        return false;
    };
    FallingStone.prototype.isUnbreakable = function () {
        return false;
    };
    FallingStone.prototype.isPlayer = function () {
        return false;
    };
    FallingStone.prototype.isStone = function () {
        return false;
    };
    FallingStone.prototype.isFallingStone = function () {
        return true;
    };
    FallingStone.prototype.isBox = function () {
        return false;
    };
    FallingStone.prototype.isFallingBox = function () {
        return false;
    };
    FallingStone.prototype.isKey1 = function () {
        return false;
    };
    FallingStone.prototype.isLock1 = function () {
        return false;
    };
    FallingStone.prototype.isKey2 = function () {
        return false;
    };
    FallingStone.prototype.isLock2 = function () {
        return false;
    };
    return FallingStone;
}());
var Box = /** @class */ (function () {
    function Box() {
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
        return false;
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
    return Box;
}());
var FallingBox = /** @class */ (function () {
    function FallingBox() {
    }
    FallingBox.prototype.isAir = function () {
        return false;
    };
    FallingBox.prototype.isFlux = function () {
        return false;
    };
    FallingBox.prototype.isUnbreakable = function () {
        return false;
    };
    FallingBox.prototype.isPlayer = function () {
        return false;
    };
    FallingBox.prototype.isStone = function () {
        return false;
    };
    FallingBox.prototype.isFallingStone = function () {
        return false;
    };
    FallingBox.prototype.isBox = function () {
        return false;
    };
    FallingBox.prototype.isFallingBox = function () {
        return true;
    };
    FallingBox.prototype.isKey1 = function () {
        return false;
    };
    FallingBox.prototype.isLock1 = function () {
        return false;
    };
    FallingBox.prototype.isKey2 = function () {
        return false;
    };
    FallingBox.prototype.isLock2 = function () {
        return false;
    };
    return FallingBox;
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
        moveHorizontal(1);
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
        moveHorizontal(-1);
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
        moveVertical(-1);
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
        moveVertical(1);
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
            return new Stone();
        case RawTile.FALLING_STONE:
            return new FallingStone();
        case RawTile.BOX:
            return new Box();
        case RawTile.FALLING_BOX:
            return new FallingBox();
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
function moveHorizontal(dx) {
    if (map[playery][playerx + dx].isFlux() || map[playery][playerx + dx].isAir()) {
        moveToTile(playerx + dx, playery);
    }
    else if ((map[playery][playerx + dx].isStone() || map[playery][playerx + dx].isBox()) &&
        map[playery][playerx + dx + dx].isAir() &&
        !map[playery + 1][playerx + dx].isAir()) {
        map[playery][playerx + dx + dx] = map[playery][playerx + dx];
        moveToTile(playerx + dx, playery);
    }
    else if (map[playery][playerx + dx].isKey1()) {
        removeLock1();
        moveToTile(playerx + dx, playery);
    }
    else if (map[playery][playerx + dx].isKey2()) {
        removeLock2();
        moveToTile(playerx + dx, playery);
    }
}
function moveVertical(dy) {
    if (map[playery + dy][playerx].isFlux() || map[playery + dy][playerx].isAir()) {
        moveToTile(playerx, playery + dy);
    }
    else if (map[playery + dy][playerx].isKey1()) {
        removeLock1();
        moveToTile(playerx, playery + dy);
    }
    else if (map[playery + dy][playerx].isKey2()) {
        removeLock2();
        moveToTile(playerx, playery + dy);
    }
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
    if ((map[y][x].isStone() || map[y][x].isFallingStone()) && map[y + 1][x].isAir()) {
        map[y + 1][x] = new FallingStone();
        map[y][x] = new Air();
    }
    else if ((map[y][x].isBox() || map[y][x].isFallingBox()) && map[y + 1][x].isAir()) {
        map[y + 1][x] = new FallingBox();
        map[y][x] = new Air();
    }
    else if (map[y][x].isFallingStone()) {
        map[y][x] = new Stone();
    }
    else if (map[y][x].isFallingBox()) {
        map[y][x] = new Box();
    }
}
function draw() {
    var graphics = createGraphics();
    drawMap(graphics);
    drawPlayer(graphics);
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
            colorOfTile(g, x, y);
            if (!map[y][x].isAir() && !map[y][x].isPlayer())
                g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
    }
}
function colorOfTile(g, x, y) {
    if (map[y][x].isFlux())
        g.fillStyle = "#ccffcc";
    else if (map[y][x].isUnbreakable())
        g.fillStyle = "#999999";
    else if (map[y][x].isStone() || map[y][x].isFallingStone())
        g.fillStyle = "#0000cc";
    else if (map[y][x].isBox() || map[y][x].isFallingBox())
        g.fillStyle = "#8b4513";
    else if (map[y][x].isKey1() || map[y][x].isLock1())
        g.fillStyle = "#ffcc00";
    else if (map[y][x].isKey2() || map[y][x].isLock2())
        g.fillStyle = "#00ccff";
}
function drawPlayer(g) {
    g.fillStyle = "#ff0000";
    g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
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
