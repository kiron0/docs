# Getting Started

Let's write your first NullScript program! 🎭

## Your First Program

Create a file called `hello.ns`:

```javascript
run greet(name) {
  return `Hello, ${name}! Welcome to NullScript! 🎭`;
}

fixed message = greet("Developer");
speak.say(message);
```

### Run the Program

```bash
nsc run hello.ns
```

Output:

```
Hello, Developer! Welcome to NullScript! 🎭
```

### Compile to JavaScript

```bash
nsc build hello.ns
```

This creates `hello.js`:

```javascript
function greet(name) {
  return `Hello, ${name}! Welcome to NullScript! 🎭`;
}

const message = greet("Developer");
console.log(message);
```

## Understanding the Syntax

Let's break down what we just wrote:

| NullScript        | JavaScript             | Meaning            |
| ----------------- | ---------------------- | ------------------ |
| `run greet(name)` | `function greet(name)` | Define a function  |
| `fixed message`   | `const message`        | Declare a constant |
| `speak.say()`     | `console.log()`        | Print to console   |

## More Examples

### Variables and Data Types

```javascript
// Constants
fixed name = "Alice";
fixed age = 25;
fixed isActive = yes;

// Variables
let counter = 0;
let items = [];

// Output
speak.say(`Name: ${name}, Age: ${age}`);
speak.say(`Active: ${isActive}`);
```

### Functions

```javascript
// Regular function
run add(a, b) {
  return a + b;
}

// Arrow function equivalent (same syntax)
fixed multiply = (a, b) => a * b;

// Async function
run later fetchData(url) {
  let response = hold pull(url);
  return hold response.json();
}
```

### Control Flow

```javascript
run checkAge(age) {
  whatever (age moreeq 18) {
    speak.say("You're an adult!");
  } otherwise whatever (age moreeq 13) {
    speak.say("You're a teenager!");
  } otherwise {
    speak.say("You're a kid!");
  }
}

// Loops
since (let i = 0; i less 5; i++) {
  speak.say(`Count: ${i}`);
}

// For...of loop
fixed fruits = ["apple", "banana", "orange"];
since (fixed fruit part fruits) {
  speak.say(`Fruit: ${fruit}`);
}
```

### Error Handling

```javascript
run safeDivide(a, b) {
  test {
    whatever (b is 0) {
      trigger fresh fail("Division by zero!");
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

### Classes

```javascript
model Person {
  __init__(name, age) {
    self.name = name;
    self.age = age;
  }

  run greet() {
    return `Hi, I'm ${self.name} and I'm ${self.age} years old.`;
  }

  run later celebrate() {
    speak.say("🎉 Celebrating!");
    hold delay(() => speak.say("Party time!"), 1000);
  }
}

fixed person = fresh Person("Alice", 25);
speak.say(person.greet());
person.celebrate();
```

## Project Structure

For larger projects, organize your NullScript files:

```
my-project/
├── src/
│   ├── main.ns
│   ├── utils/
│   │   ├── helpers.ns
│   │   └── math.ns
│   └── models/
│       └── user.ns
├── dist/          # Compiled JavaScript
└── package.json
```

### Building a Project

```bash
# Build entire project
nsc build src/ --outDir dist
```

## Import/Export

NullScript supports modern ES6 import/export syntax:

**math.ns**:

```javascript
share run add(a, b) {
  return a + b;
}

share run subtract(a, b) {
  return a - b;
}

share fixed PI = 3.14159;
```

**main.ns**:

```javascript
use { add, subtract, PI } from './math.ns';

fixed result = add(5, 3);
speak.say(`5 + 3 = ${result}`);
speak.say(`PI = ${PI}`);
```

## CLI Commands

| Command             | Description                     |
| ------------------- | ------------------------------- |
| `nsc run file.ns`   | Run NullScript file directly    |
| `nsc build src/`    | Compile directory to JavaScript |
| `nsc build file.ns` | Compile single file             |
| `nsc keywords`      | Show all keyword mappings       |
| `nsc --help`        | Show help information           |

## Next Steps

Now that you understand the basics:

- [Learn more concepts →](../guide/basic-concepts.md)
- [Explore the full keyword reference →](../reference/keywords.md)
- [Check out more examples →](../examples/basic.md)
- [Learn about CLI usage →](../cli/usage.md)
