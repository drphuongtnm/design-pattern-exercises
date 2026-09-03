// ============================================================
// LISKOV SUBSTITUTION PRINCIPLE (LSP)
// "A subclass should be substitutable for its base class
// without breaking the caller's expectations."
// ============================================================

// ------------------------------------------------------------
// BAD: Square extends Rectangle, but overrides setters in a way
// that silently breaks Rectangle's contract (width and height
// are supposed to be independent).
// ------------------------------------------------------------

class Rectangle {
  constructor(protected width: number, protected height: number) {}

  setWidth(value: number): void {
    this.width = value;
  }

  setHeight(value: number): void {
    this.height = value;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class SquareBad extends Rectangle {
  // Forces width and height to always stay equal.
  // This changes Rectangle's behavior, not just extends it.
  setWidth(value: number): void {
    this.width = value;
    this.height = value;
  }

  setHeight(value: number): void {
    this.width = value;
    this.height = value;
  }
}

function resizeAndPrint(rect: Rectangle): void {
  rect.setWidth(5);
  rect.setHeight(10);
  // Caller expects: width=5, height=10, area=50
  console.log(`Expected area 50, got ${rect.getArea()}`);
}

console.log("--- BAD: SquareBad breaks the caller's expectation ---");
resizeAndPrint(new Rectangle(0, 0)); // Expected area 50, got 50
resizeAndPrint(new SquareBad(0, 0)); // Expected area 50, got 100 <- surprise!

// ------------------------------------------------------------
// GOOD: Square does not extend Rectangle. Both just implement
// a shared "Shape" contract (area only). No hidden assumptions
// to break.
// ------------------------------------------------------------

interface Shape {
  getArea(): number;
}

class RectangleGood implements Shape {
  constructor(private width: number, private height: number) {}

  setWidth(value: number): void {
    this.width = value;
  }

  setHeight(value: number): void {
    this.height = value;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

class SquareGood implements Shape {
  constructor(private size: number) {}

  setSize(value: number): void {
    this.size = value;
  }

  getArea(): number {
    return this.size * this.size;
  }
}

function printArea(shape: Shape): void {
  console.log(`Area: ${shape.getArea()}`);
}

console.log("\n--- GOOD: no inheritance, no broken assumptions ---");
printArea(new RectangleGood(5, 10)); // Area: 50
printArea(new SquareGood(5)); // Area: 25

export {};