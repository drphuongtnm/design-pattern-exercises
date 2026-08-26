// ============================================================
// PROBLEM: making a square as a special case of rectangle
// violates the Liskov Substitution Principle (LSP)
// because it changes the behavior of the base class.
// In this example, when we set the height of a square,
// it also changes the width, which is not expected behavior
// for a rectangle.
// ============================================================

class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  toString() {
    return `${this._width}x${this._height}`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = value;
    this._height = value;
  }

  set height(value) {
    this._width = value;
    this._height = value;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }
}

let useIt = function (rc) {
  let width = rc.width;
  rc.height = 10;
  console.log(`Expected area of ${10 * width}, got ${rc.area}`);
};

console.log("--- PROBLEM: Square extends Rectangle (violates LSP) ---");
let rc = new Rectangle(2, 3);
useIt(rc);

let sq = new Square(5);
useIt(sq);
// Expected area of 20, got 20   -> OK for Rectangle
// Expected area of 50, got 100  -> WRONG expectation for Square
// (100 is not "wrong" mathematically, but useIt() was written
// assuming Rectangle's contract that changing height does not
// affect width - Square breaks that assumption)

// ============================================================
// SOLUTION 1: Common interface / base class. Square does NOT
// extend Rectangle. Each shape manages its own fields and does
// not expose width/height as independent values if the shape's
// nature does not actually allow them to be independent.
// ============================================================

class Shape {
  get area() {
    throw new Error("Subclass must implement get area()");
  }
}

class Rectangle2 extends Shape {
  constructor(width, height) {
    super();
    this._width = width;
    this._height = height;
  }
  get width() {
    return this._width;
  }
  set width(value) {
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value) {
    this._height = value;
  }
  get area() {
    return this._width * this._height;
  }
  toString() {
    return `${this._width}x${this._height}`;
  }
}

class Square2 extends Shape {
  constructor(size) {
    super();
    this._size = size;
  }
  get size() {
    return this._size;
  }
  set size(value) {
    this._size = value;
  }
  get area() {
    return this._size * this._size;
  }
  toString() {
    return `${this._size}x${this._size}`;
  }
}

// useIt2 only relies on "area" - the shared contract guaranteed
// by Shape - not on individual width/height, so there is no more
// broken assumption.
let useIt2 = function (shape) {
  console.log(`Area of ${shape}: ${shape.area}`);
};

console.log("\n--- SOLUTION 1: Shape base class, Square kept separate ---");
let rc2 = new Rectangle2(2, 3);
useIt2(rc2); // Area of 2x3: 6

let sq2 = new Square2(5);
useIt2(sq2); // Area of 5x5: 25
sq2.size = 10;
console.log(`After changing size -> Area of ${sq2}: ${sq2.area}`); // 100, matches expectation, no surprise

// ============================================================
// SOLUTION 2: Factory pattern - no separate Square class at all.
// A "square" is just a special way of creating a Rectangle.
// Use this when you actually want the result to still be typed
// as a Rectangle.
// ============================================================

class RectangleFactory {
  static createRectangle(width, height) {
    return new Rectangle2(width, height);
  }
  static createSquare(size) {
    return new Rectangle2(size, size);
  }
}

console.log("\n--- SOLUTION 2: Factory, no Square class ---");
let sq3 = RectangleFactory.createSquare(5);
useIt2(sq3); // still a plain Rectangle2, width/height set independently, no special behavior