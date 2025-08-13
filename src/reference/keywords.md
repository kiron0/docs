# Keywords Reference

NullScript provides fun, expressive alternatives to standard JavaScript keywords while maintaining full compatibility.

## Core Language Keywords

### Functions and Variables

| NullScript | JavaScript | Example                   |
| ---------- | ---------- | ------------------------- |
| `run`      | `function` | `run greet(name) { ... }` |
| `fixed`    | `const`    | `fixed PI = 3.14159;`     |
| `let`      | `let`      | `let counter = 0;`        |
| `var`      | `var`      | `var legacy = "old";`     |

### Control Flow

| NullScript  | JavaScript | Example                         |
| ----------- | ---------- | ------------------------------- |
| `whatever`  | `if`       | `whatever (condition) { ... }`  |
| `otherwise` | `else`     | `otherwise { ... }`             |
| `since`     | `for`      | `since (item of items) { ... }` |
| `when`      | `while`    | `when (condition) { ... }`      |
| `switch`    | `switch`   | `switch (value) { ... }`        |
| `case`      | `case`     | `case "value":`                 |
| `done`      | `default`  | `done:`                         |
| `stop`      | `break`    | `stop;`                         |
| `keepgoing` | `continue` | `keepgoing;`                    |

### Modules

| NullScript | JavaScript | Example                 |
| ---------- | ---------- | ----------------------- |
| `use`      | `import`   | `use fs from 'fs';`     |
| `share`    | `export`   | `share { myFunction };` |

### Error Handling

| NullScript | JavaScript | Example                |
| ---------- | ---------- | ---------------------- |
| `test`     | `try`      | `test { ... }`         |
| `grab`     | `catch`    | `grab (error) { ... }` |
| `atLast`   | `finally`  | `atLast { ... }`       |
| `trigger`  | `throw`    | `trigger new Error();` |

### Classes and Objects

| NullScript | JavaScript    | Example                        |
| ---------- | ------------- | ------------------------------ |
| `model`    | `class`       | `model MyClass { ... }`        |
| `__init__` | `constructor` | `__init__() { ... }`           |
| `inherits` | `extends`     | `model Child inherits Parent`  |
| `fresh`    | `new`         | `fresh MyClass();`             |
| `self`     | `this`        | `self.property`                |
| `parent`   | `super`       | `parent.method();`             |
| `forever`  | `static`      | `run forever method() { ... }` |

### Async Programming

| NullScript | JavaScript | Example                     |
| ---------- | ---------- | --------------------------- |
| `later`    | `async`    | `run later fetch() { ... }` |
| `hold`     | `await`    | `let data = hold fetch();`  |

### Boolean Values

| NullScript | JavaScript | Example                |
| ---------- | ---------- | ---------------------- |
| `yes`      | `true`     | `fixed isValid = yes;` |
| `no`       | `false`    | `fixed isValid = no;`  |

### Other Keywords

| NullScript | JavaScript   | Example                               |
| ---------- | ------------ | ------------------------------------- |
| `remove`   | `delete`     | `remove obj.property;`                |
| `what`     | `typeof`     | `what value`                          |
| `kind`     | `instanceof` | `whatever (obj kind Array) { ... }`   |
| `inside`   | `in`         | `whatever ("key" inside obj) { ... }` |
| `part`     | `of`         | `since (item part items) { ... }`     |
| `nothing`  | `void`       | `nothing 0`                           |
| `using`    | `with`       | `using (obj) { ... }`                 |
| `freeze`   | `debugger`   | `freeze;`                             |
| `pause`    | `yield`      | `pause value;`                        |
| `getter`   | `get`        | `getter property() { ... }`           |
| `setter`   | `set`        | `setter property(value) { ... }`      |

## Examples

### Variable Declarations

```javascript
// Constants
fixed name = "Alice";
fixed age = 25;
fixed skills = ["JavaScript", "Rust", "NullScript"];

// Variables
let score = 0;
let isPlaying = yes;

// Legacy variables (avoid when possible)
var oldStyle = "not recommended";
```

### Function Definitions

```javascript
// Regular function
run calculateArea(length, width) {
  return length * width;
}

// Arrow function (same syntax as JavaScript)
fixed multiply = (a, b) => a * b;

// Async function
run later fetchUserData(id) {
  let response = hold pull(`/api/users/${id}`);
  return hold response.json();
}

// Class method
model Calculator {
  run add(a, b) {
    return a + b;
  }

  run forever multiply(a, b) {
    return a * b;
  }
}
```

### Control Flow Examples

```javascript
// Conditional statements
whatever (age moreeq 18) {
  speak.say("You can vote!");
} otherwise whatever (age moreeq 16) {
  speak.say("You can drive!");
} otherwise {
  speak.say("You're still young!");
}

// Loops
since (let i = 0; i less 10; i++) {
  speak.say(`Count: ${i}`);
}

since (fixed item part ["apple", "banana", "cherry"]) {
  speak.say(`Fruit: ${item}`);
}

// While loop
let count = 0;
when (count less 5) {
  speak.say(`Count: ${count}`);
  count++;
}
```

### Error Handling

```javascript
run safeDivision(a, b) {
  test {
    whatever (b is 0) {
      trigger fresh fail("Cannot divide by zero!");
    }
    return a / b;
  } grab (error) {
    speak.scream(`Error: ${error.message}`);
    return null;
  } atLast {
    speak.say("Division operation completed");
  }
}
```

## Compatibility Notes

- All NullScript keywords compile to their exact JavaScript equivalents
- You can mix NullScript and JavaScript syntax in the same file
- The transpiler only replaces NullScript keywords, leaving everything else unchanged
- Output JavaScript is always clean and readable
