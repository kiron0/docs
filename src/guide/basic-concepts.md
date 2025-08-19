# Basic Concepts

NullScript is a playful, parody programming language that compiles to JavaScript. It maintains full JavaScript compatibility while providing fun, expressive alternatives to standard keywords.

## Philosophy

NullScript embraces the philosophy that programming should be enjoyable and expressive. It takes familiar JavaScript concepts and wraps them in more playful, memorable syntax without sacrificing functionality or performance.

## Key Principles

### 1. **JavaScript Compatibility**

- Every NullScript program compiles to valid JavaScript
- No runtime dependencies or overhead
- Seamless integration with existing JavaScript projects

### 2. **Fun-First Design**

- Keywords are chosen for memorability and expressiveness
- Syntax encourages creative, readable code
- Maintains professional functionality with playful presentation

### 3. **Zero Learning Curve**

- If you know JavaScript, you already know NullScript
- Keywords map 1:1 to JavaScript equivalents
- No new concepts to learn, just different ways to express them

## Core Concepts

### Function Declarations

Instead of `function`, use `run`:

```javascript
// NullScript
run greet(name) {
  return `Hello, ${name}!`;
}

// Compiles to JavaScript
function greet(name) {
  return `Hello, ${name}!`;
}
```

### Variable Declarations

Use `fixed` for constants and `let` for variables:

```javascript
// NullScript
fixed PI = 3.14159;
let counter = 0;

// Compiles to JavaScript
const PI = 3.14159;
let counter = 0;
```

### Control Flow

Express conditions with `whatever` and `otherwise`:

```javascript
// NullScript
whatever (age >= 18) {
  speak.say("Adult");
} otherwise {
  speak.say("Minor");
}

// Compiles to JavaScript
if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

### Console Output

Use `speak.say()` instead of `console.log()`:

```javascript
// NullScript
speak.say("Hello, World!");
speak.scream("Error message");

// Compiles to JavaScript
console.log("Hello, World!");
console.error("Error message");
```

## File Extension

NullScript uses the `.ns` file extension to distinguish NullScript files from regular JavaScript files. This makes it easy to identify and organize your code.

## Compilation Process

1. **Parse**: NullScript parser reads `.ns` files
2. **Transform**: Keywords are mapped to JavaScript equivalents
3. **Generate**: Clean, readable JavaScript is output
4. **Execute**: Standard JavaScript runtime executes the code

The compilation is transparent - you get the same performance as writing JavaScript directly, but with more expressive syntax.

## Integration

NullScript integrates seamlessly with:

- **Node.js** projects
- **Browser** applications
- **Build tools** (Webpack, Vite, etc.)
- **Testing frameworks** (Jest, Mocha, etc.)
- **Package managers** (npm, yarn, pnpm)

Since NullScript compiles to JavaScript, it works everywhere JavaScript works.

## Next Steps

Now that you understand the basic concepts, explore:

- **[Advanced Async Patterns](../guide/async-patterns.md)** - Master asynchronous programming with `later`, `hold`, `test`, and `grab`
- **[Module System](../guide/modules.md)** - Learn to organize code with `use`, `share`, and `from`
- **[Class System](../guide/classes.md)** - Build object-oriented code with `model`, `self`, and `__init__`
- **[Best Practices](../guide/best-practices.md)** - Follow coding standards and patterns
