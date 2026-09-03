// ============================================================
// DEPENDENCY INVERSION PRINCIPLE (DIP)
// "High-level modules should not depend on low-level modules.
// Both should depend on abstractions."
// ============================================================

enum RelType {
  Parent = "parent",
}

interface Relationship {
  from: Person;
  type: RelType;
  to: Person;
}

class Person {
  constructor(public name: string) {}
}

// LOW-LEVEL MODULE: stores raw data
class Relationships {
  data: Relationship[] = [];

  addParentAndChild(parent: Person, child: Person) {
    this.data.push({ from: parent, type: RelType.Parent, to: child });
  }
}

// ------------------------------------------------------------
// BAD: Research (high-level) reaches directly into
// Relationships' internal array. If storage changes later,
// Research breaks too.
// ------------------------------------------------------------
class ResearchBad {
  constructor(relationships: Relationships) {
    for (const r of relationships.data) {
      if (r.from.name === "John") {
        console.log(`John has a child called ${r.to.name}`);
      }
    }
  }
}

// ------------------------------------------------------------
// GOOD: an abstraction (interface) sits between them.
// Research only depends on the interface, not on how data
// is actually stored.
// ------------------------------------------------------------
interface RelationshipBrowser {
  findChildrenOf(name: string): Person[];
}

class RelationshipsGood extends Relationships implements RelationshipBrowser {
  findChildrenOf(name: string): Person[] {
    return this.data.filter((r) => r.from.name === name).map((r) => r.to);
  }
}

class ResearchGood {
  constructor(browser: RelationshipBrowser) {
    for (const child of browser.findChildrenOf("John")) {
      console.log(`John has a child called ${child.name}`);
    }
  }
}

// --- Demo ---
const john = new Person("John");
const chris = new Person("Chris");

console.log("BAD:");
const bad = new Relationships();
bad.addParentAndChild(john, chris);
new ResearchBad(bad);

console.log("\nGOOD:");
const good = new RelationshipsGood();
good.addParentAndChild(john, chris);
new ResearchGood(good);

export {};