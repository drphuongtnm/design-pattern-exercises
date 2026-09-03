// ============================================================
// BUILDER PATTERN
// Purpose: construct a complex object step by step, instead of
// passing everything into one giant constructor call.
// Here, CodeBuilder builds up the STRING representation of a
// JS class, one field at a time.
// ============================================================

class CodeBuilder {
  constructor(className) {
    this.className = className;
    this.fields = []; // fields accumulated step by step via addField()
  }

  // Each "step" of the builder. Returns `this` so calls can be
  // CHAINED: cb.addField('name').addField('age')...
  // This chaining style is a hallmark of the Builder pattern.
  addField(name) {
    this.fields.push(name);
    return this; // <-- key trick: return the builder itself for chaining
  }

  // Only at the END do we assemble the final result (the class code).
  // Nothing is "built" until you call toString() (or a dedicated
  // build() method in other Builder examples).
  toString() {
    if (this.fields.length === 0) {
      return `class ${this.className} {\n}`;
    }

    // constructor(name, age)
    const args = this.fields.join(', ');

    // this.name = name;
    // this.age = age;
    const assignments = this.fields
      .map(field => `   this.${field} = ${field};`)
      .join('\n');

    return `class ${this.className} {\n  constructor(${args}) {\n${assignments}\n  }\n}`;
  }
}

// --- Usage ---
// Notice: no giant constructor like `new CodeBuilder('Person', ['name', 'age'])`.
// Instead, we build it up piece by piece, then finalize with toString().
const cb = new CodeBuilder('Person');
cb.addField('name').addField('age'); // chained calls, thanks to `return this`
console.log(cb.toString());

// ============================================================
// WHY USE BUILDER instead of just passing everything into the constructor?
// - Useful when an object has MANY optional parts, and building it
//   in one constructor call would be messy (too many arguments).
// - Lets you build the object incrementally, possibly with conditions:
//     const cb = new CodeBuilder('Person');
//     if (needsName) cb.addField('name');
//     if (needsAge) cb.addField('age');
// - The chainable `.addField().addField()` style is called a
//   "fluent interface" - a common way Builder is implemented.
// ============================================================