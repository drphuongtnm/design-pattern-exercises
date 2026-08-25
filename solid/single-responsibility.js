const fs = require("fs");

class Journal {
  constructor() {
    this.entries = [];
  }

  addEntry(text) {
    let c = ++Journal.count;
    const entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return entry;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  // Don't add persistence methods to the Journal class, as it violates the Single Responsibility Principle (SRP).
  // save(filename)
  // {
  //   fs.writeFileSync(filename, this.toString());
  // }
  //
  // load(filename)
  // {
  //   //
  // }
  //
  // loadFromUrl(url)
  // {
  //   //
  // }
}

class PersistenceManager {
  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }
}
Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today.");
j.addEntry("I ate a bug.");

console.log(j.toString());

let p = new PersistenceManager();
const filename = "journal.txt";
p.saveToFile(j, filename);
console.log(`Journal saved to ${filename}`);
