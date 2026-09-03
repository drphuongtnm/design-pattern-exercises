//wrong example of interface segregation principle

interface Machine {
  print(): void;
  scan(): void;
  fax(): void;
}

class MultiFunctionPrinter implements Machine {
  print(): void {
    console.log("Printing document...");
  }
  scan(): void {
    console.log("Scanning document...");
  }
  fax(): void {
    console.log("Faxing document...");
  }
}

class OldFashionedPrinter implements Machine {
  print(): void {
    console.log("Printing document...");
  }
  scan(): void {
    throw new Error("Scan operation not supported.");
  }
  fax(): void {
    throw new Error("Fax operation not supported.");
  }
}

// This design violates the Interface Segregation Principle 
// because the OldFashionedPrinter class is forced to implement methods (scan and fax) that it does not support.
// A better design would be to split the Machine interface into smaller, more specific interfaces.

interface Printer {
  print(): void;
}

class SimplePrinter implements Printer {
  print(): void {
    console.log("Printing document...");
  }
}

class AdvancedPrinter implements Printer {
  print(): void {
    console.log("Printing document...");
  }
  scan(): void {
    console.log("Scanning document...");
  }
  fax(): void {
    console.log("Faxing document...");
  }
}