# NullScript 🎭

> **JavaScript with Attitude** - A fun parody programming language that transpiles to JavaScript

NullScript is a playful and creative programming language that brings humor and personality to JavaScript development. With quirky keyword aliases and a distinctive `.ns` file extension, NullScript makes coding more enjoyable while maintaining full JavaScript compatibility.

## 🚀 Quick Start

### Installation

```bash
# Install NullScript CLI globally
npm install -g nullscript

# Or install locally in your project
npm install --save-dev nullscript
```

### Your First NullScript Program

Create a file called `hello.ns`:

```javascript
run greet(name) {
  return `Hello, ${name}! Welcome to NullScript! 🎭`;
}

fixed message = greet("World");
speak.say(message);
```

Compile and run:

```bash
# Compile to JavaScript
nsc run hello.ns

# Or compile and run directly
nsc run hello.ns
```

Output:

```
Hello, World! Welcome to NullScript! 🎭
```

## 🎪 Language Features

### Fun Keyword Aliases

NullScript replaces traditional JavaScript keywords with more expressive alternatives:

| JavaScript      | NullScript     | Description           |
| --------------- | -------------- | --------------------- |
| `function`      | `run`          | Define a function     |
| `const`         | `fixed`        | Constant variable     |
| `let`           | `let`          | Mutable variable      |
| `console.log`   | `speak.say`    | Print to console      |
| `console.error` | `speak.scream` | Print error           |
| `if`            | `whatever`     | Conditional statement |
| `else`          | `otherwise`    | Else clause           |
| `true`          | `yes`          | Boolean true          |
| `false`         | `no`           | Boolean false         |
| `class`         | `model`        | Define a class        |
| `new`           | `fresh`        | Create instance       |

### Basic Syntax Examples

#### Variables and Functions

```javascript
// Variables
fixed name = "NullScript";
let counter = 0;

// Functions
run calculateSum(a, b) {
  return a + b;
}

run greetUser(username) {
  whatever (username) {
    speak.say(`Welcome, ${username}!`);
  } otherwise {
    speak.say("Welcome, anonymous user!");
  }
}
```

Compiles to:

```javascript
// Variables
const name = "NullScript";
let counter = 0;

// Functions
function calculateSum(a, b) {
  return a + b;
}

function greetUser(username) {
  if (username) {
    console.log(`Welcome, ${username}!`);
  } else {
    console.log("Welcome, anonymous user!");
  }
}
```

#### Control Flow

```javascript
run checkAge(age) {
  whatever (age >= 18) {
    speak.say("You are an adult! 🎉");
  } otherwise whatever (age >= 13) {
    speak.say("You are a teenager! 🧑‍🎤");
  } otherwise {
    speak.say("You are a child! 👶");
  }
}

// Loop example
run countToFive() {
  let i = 1;
  when (i <= 5) {
    speak.say(`Count: ${i}`);
    i++;
  }
}
```

#### Objects and Arrays

```javascript
// Object creation
fixed person = {
  name: "Alice",
  age: 30,
  isActive: yes
};

// Array operations
fixed numbers = [1, 2, 3, 4, 5];
fixed doubled = numbers.map(n => n * 2);

speak.say("Doubled numbers:", doubled);
```

#### Async/Await

```javascript
run later fetchUserData(userId) {
  test {
    fixed response = hold pull(`/api/users/${userId}`);
    fixed userData = hold response.json();
    return userData;
  } grab (error) {
    speak.scream("Error fetching user data:", error);
    return null;
  }
}
```

## 🛠️ CLI Usage

### Installation

```bash
# Install globally
npm install -g nullscript
```

### Basic Commands

```bash
# Run a NullScript file directly
nsc run hello.ns

# Compile to JavaScript
nsc build hello.ns

# Compile directory
nsc build src/

# Compile with output directory
nsc build src/ --outDir dist

# Show keyword mappings
nsc keywords

# Show keywords by category
nsc keywords --category control-flow
```

## 🌟 Advanced Examples

### Class Definition

```javascript
model Calculator {
  __init__() {
    self.history = [];
  }

  run add(a, b) {
    fixed result = a + b;
    self.history.push(`${a} + ${b} = ${result}`);
    return result;
  }

  run getHistory() {
    return self.history;
  }
}

fixed calc = fresh Calculator();
fixed sum = calc.add(5, 3);
speak.say(`Result: ${sum}`);
```

### Module System

**math.ns**

```javascript
fixed PI = 3.14159;

run calculateArea(radius) {
  return PI * radius * radius;
}

run calculateCircumference(radius) {
  return 2 * PI * radius;
}

share { PI, calculateArea, calculateCircumference };
```

**main.ns**

```javascript
use { calculateArea, calculateCircumference } from './math.ns';

fixed radius = 5;
fixed area = calculateArea(radius);
fixed circumference = calculateCircumference(radius);

speak.say(`Circle with radius ${radius}:`);
speak.say(`Area: ${area}`);
speak.say(`Circumference: ${circumference}`);
```

### Error Handling

```javascript
run safeDivide(a, b) {
  whatever (b === 0) {
    speak.scream("Error: Division by zero!");
    return null;
  }
  return a / b;
}

run processData(data) {
  test {
    fixed result = JSON.parse(data);
    speak.say("Data processed successfully");
    return result;
  } grab (error) {
    speak.scream("Failed to process data:", error.message);
    return null;
  }
}
```

## 🔧 Integration with JavaScript

NullScript is fully compatible with JavaScript and Node.js ecosystems:

### Import JavaScript in NullScript

```javascript
use axios from 'axios';
use { format } from 'date-fns';

run later fetchAndFormatData() {
  test {
    fixed response = hold axios.get('/api/data');
    fixed timestamp = format(fresh Date(), 'yyyy-MM-dd HH:mm:ss');

    speak.say(`Data fetched at ${timestamp}`);
    return response.data;
  } grab (error) {
    speak.scream("API request failed:", error.message);
  }
}
```

### Use NullScript in JavaScript

```javascript
// Import compiled NullScript module
import { greet, calculateSum } from "./compiled/utils.js";

// Use NullScript functions in JavaScript
const message = greet("JavaScript Developer");
const sum = calculateSum(10, 20);

console.log(message); // Output from NullScript function
console.log(sum); // Output from NullScript function
```

## 🎯 Why Choose NullScript?

### ✅ Benefits

- **Zero Learning Curve**: It's still JavaScript underneath
- **Enhanced Readability**: More expressive keywords make code self-documenting
- **Full Compatibility**: Works with all JavaScript libraries and frameworks
- **Developer Experience**: Makes programming more enjoyable and fun
- **Gradual Adoption**: Can be introduced incrementally to existing projects
- **Performance**: Zero runtime overhead - compiles to clean JavaScript

### 🎪 Perfect For

- **Learning Projects**: Makes JavaScript more approachable for beginners
- **Creative Coding**: When you want to add personality to your code
- **Team Building**: Brings fun and humor to development
- **Prototyping**: Quick and expressive code for rapid development
- **Educational Content**: Teaching programming concepts with engaging syntax

## 📚 Documentation

- **[Getting Started Guide](./src/guide/getting-started.md)** - Complete setup and first steps
- **[Language Reference](./src/reference/keywords.md)** - Full keyword mapping and syntax
- **[Examples](./src/examples/basic.md)** - More code examples and patterns
- **[CLI Documentation](./src/cli/usage.md)** - Complete command-line interface guide
- **[Interactive Playground](./src/playground.md)** - Try NullScript in your browser

## 🤝 Contributing

We welcome contributions! Whether it's:

- 🐛 Bug reports and fixes
- 💡 Feature suggestions and implementations
- 📖 Documentation improvements
- 🎨 Design and UX enhancements
- 🧪 Test cases and examples

See our [Contributing Guide](https://github.com/nullscript-lang/nullscript/blob/main/CONTRIBUTING.md) for details.

## 📄 License

MIT License - see [LICENSE](https://github.com/nullscript-lang/nullscript/blob/main/LICENSE) file for details.

## 🎭 Philosophy

> "NullScript: Because programming should be fun, even when it's serious."

NullScript embraces the joy of coding while maintaining the power and flexibility of JavaScript. It's not just a language - it's a statement that programming can be both productive and entertaining.

---

**Ready to add some attitude to your JavaScript?** 🚀

[Get Started](./src/guide/getting-started.md) | [Try the Playground](./src/playground.md) | [View Examples](./src/examples/basic.md)
