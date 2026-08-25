let Color = Object.freeze({
  RED: "red",
  GREEN: "green",
  BLUE: "blue",
});

let Size = Object.freeze({
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
});

// worst implementation of open-closed principle
class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

//open for extension, closed for modification
class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  filterBySizeAndColor(products, size, color) {
    return products.filter((p) => p.size === size && p.color === color);
  }
  //state space explosion
  // 3 criteria = 7 methods
}

//specification pattern
// can have a base specification class and extend it for different criteria
class Specification {
  constructor() {
    if (this.constructor === Specification) {
      throw new Error(
        "Abstract class Specification cannot be instantiated directly",
      );
    }
  }

  isSatisfied(item) {
    throw new Error("Not implemented");
  }
}
class ColorSpecification extends Specification { // javaScript does not have interfaces, so we can use abstract classes to achieve the same effect
  constructor(color) {
    super(); //should have this if you are extending a class
    this.color = color;
  }

  // if child class does not implement this method, it will throw an error since it is an abstract class
  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification extends Specification {
  constructor(size) {
    super();
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

class AndSpecification extends Specification {
  constructor(...specs) {
    super();
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

let apple = new Product("Apple", Color.RED, Size.SMALL);
let tree = new Product("Tree", Color.GREEN, Size.LARGE);
let house = new Product("House", Color.BLUE, Size.LARGE);

let products = [apple, tree, house];
let pf = new ProductFilter();
console.log("Green products (old):");
for (let p of pf.filterByColor(products, Color.GREEN)) {
  console.log(` * ${p.name} is green`);
}

class BetterFilter {
  filter(items, spec) {
    return items.filter((x) => spec.isSatisfied(x));
  }
}

let bf = new BetterFilter();
console.log("Green products (new):");
for (let p of bf.filter(products, new ColorSpecification(Color.GREEN))) {
  console.log(` * ${p.name} is green`);
}

let spec = new AndSpecification(
  new ColorSpecification(Color.GREEN),
  new SizeSpecification(Size.LARGE),
);

for (let p of bf.filter(products, spec)) {
  console.log(` * ${p.name} is green and large`);
}
