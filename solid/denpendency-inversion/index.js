let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

//LOW LEVEL MODULE
class Relationships {
  constructor() {
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
}
}

//HIGH LEVEL MODULE
class Research {
  constructor(relationships) {
    let relations = relationships.data; // dependency on low-level module (data can change its shape, etc)
    for (let rel of relations.filter((r) => r.from.name === "John" && r.type === Relationship.parent)) {
      console.log(`John has a child called ${rel.to.name}`);
    }
  }
}

let parent = new Person("John");
let child1 = new Person("Chris")
let child2 = new Person("Matt");

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2); 

// Best practice
console.log("\n--- GOOD: high-level module depends on abstraction ---");
class RelationshipBrowser {
    constructor() {
        if (this.constructor === RelationshipBrowser) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    findAllChildrenOf(name) {
        throw new Error("Method 'findAllChildrenOf()' must be implemented.");
    }
}

class Relationships2 extends RelationshipBrowser {
    constructor() {
        super();
        this.data = [];
    }

    addParentAndChild(parent, child) {
        this.data.push({
            from: parent,
            type: Relationship.parent,
            to: child,
        });
    }

    findAllChildrenOf(name) {
        return this.data.filter((r) => r.from.name === name && r.type === Relationship.parent).map((r) => r.to);
    }
}

class Research2 {
    constructor(browser) {
        for (let p of browser.findAllChildrenOf("John")) {
            console.log(`John has a child called ${p.name}`);
        }
    }
}

let rels2 = new Relationships2();
rels2.addParentAndChild(parent, child1);
rels2.addParentAndChild(parent, child2);
new Research2(rels2);