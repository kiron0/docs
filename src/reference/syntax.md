# Complete Syntax Reference

> **All NullScript Syntax in One Place**

This comprehensive reference covers every aspect of NullScript syntax, from basic keywords to advanced language features.

## Basic Syntax

### **File Extension**
NullScript files use the `.ns` extension:
```bash
# File naming
app.ns          # Main application file
utils.ns        # Utility functions
components.ns   # React components
```

### **Comments**
```javascript
// Single-line comment
/* Multi-line comment
   spanning multiple lines */

// NullScript also supports JavaScript-style comments
```

### **Semicolons**
Semicolons are optional but recommended:
```javascript
run greet() {
  speak.say("Hello")  // No semicolon needed
  return "Hello"       // But recommended for clarity
}
```

## Keywords and Operators

### **Variable Declarations**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `const` | `fixed` | Declare a constant (cannot be reassigned) |
| `let` | `let` | Declare a mutable variable |
| `var` | `var` | Function-scoped variable (avoid in modern code) |

```javascript
// Variable declarations
fixed MAX_RETRIES = 3;           // Constant
let currentAttempt = 0;          // Mutable
var legacyVariable = "old";      // Function-scoped (avoid)

// Object destructuring
fixed { name, age } = person;
fixed [first, second] = array;
```

### **Function Declarations**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `function` | `run` | Declare a function |
| `=>` | `=>` | Arrow function syntax (unchanged) |

```javascript
// Function declarations
run greet(name) {
  return `Hello, ${name}!`;
}

// Arrow functions (unchanged)
const greetArrow = (name) => `Hello, ${name}!`;
const processData = (data) => {
  return data.map(item => item.name);
};
```

### **Console Methods**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `console.log()` | `speak.say()` | Print information to console |
| `console.error()` | `speak.scream()` | Print error to console |
| `console.warn()` | `speak.whisper()` | Print warning to console |
| `console.info()` | `speak.tell()` | Print info to console |
| `console.debug()` | `speak.murmur()` | Print debug info to console |

```javascript
// Console methods
speak.say("This is information");
speak.scream("This is an error!");
speak.whisper("This is a warning");
speak.tell("This is info");
speak.murmur("This is debug info");
```

### **Boolean Values**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `true` | `yes` | Boolean true value |
| `false` | `no` | Boolean false value |

```javascript
// Boolean values
fixed isActive = yes;
fixed isHidden = no;
fixed hasPermission = yes;
```

### **Control Flow Keywords**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `if` | `whatever` | Conditional statement |
| `else` | `otherwise` | Else clause |
| `else if` | `otherwise whatever` | Else if clause |
| `switch` | `choose` | Switch statement |
| `case` | `option` | Case in switch |
| `default` | `fallback` | Default case |
| `for` | `when` | For loop |
| `while` | `during` | While loop |
| `do` | `do` | Do-while loop (unchanged) |
| `break` | `break` | Break statement (unchanged) |
| `continue` | `continue` | Continue statement (unchanged) |

### **Class Keywords**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `class` | `model` | Define a class |
| `new` | `fresh` | Create new instance |
| `this` | `self` | Reference to current instance |
| `constructor` | `__init__` | Class constructor |
| `extends` | `extends` | Class inheritance (unchanged) |
| `super` | `super` | Call parent constructor (unchanged) |
| `static` | `static` | Static methods (unchanged) |

### **Module Keywords**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `import` | `use` | Import modules |
| `export` | `share` | Export modules |
| `from` | `from` | Import source (unchanged) |
| `default` | `default` | Default export (unchanged) |

### **Error Handling**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `try` | `test` | Try block |
| `catch` | `grab` | Catch block |
| `finally` | `finally` | Finally block (unchanged) |
| `throw` | `throw` | Throw error (unchanged) |

### **Async/Await**

| JavaScript | NullScript | Description |
|------------|------------|-------------|
| `async` | `later` | Async function |
| `await` | `hold` | Await promise |

## Control Flow

### **Conditional Statements**

```javascript
// Basic if-else
whatever (user.isLoggedIn) {
  speak.say("Welcome back!");
} otherwise {
  speak.say("Please log in");
}

// If-else if-else
whatever (user.role === 'admin') {
  speak.say("Admin access granted");
} otherwise whatever (user.role === 'moderator') {
  speak.say("Moderator access granted");
} otherwise {
  speak.say("User access granted");
}

// Ternary operator (unchanged)
const message = user.isLoggedIn ? "Welcome!" : "Please log in";
```

### **Switch Statements**

```javascript
// Switch statement
choose (user.role) {
  option 'admin':
    speak.say("Full access granted");
    break;
  option 'moderator':
    speak.say("Moderate access granted");
    break;
  option 'user':
    speak.say("Basic access granted");
    break;
  fallback:
    speak.say("Guest access granted");
}
```

### **Loops**

```javascript
// For loop
when (let i = 0; i < 5; i++) {
  speak.say(`Count: ${i}`);
}

// For...of loop (unchanged)
for (const item of items) {
  speak.say(item.name);
}

// For...in loop (unchanged)
for (const key in object) {
  speak.say(`${key}: ${object[key]}`);
}

// While loop
during (condition) {
  // Loop body
  break; // Exit loop
}

// Do-while loop
do {
  // Loop body
} during (condition);
```

## Functions

### **Function Declarations**

```javascript
// Basic function
run greet(name) {
  return `Hello, ${name}!`;
}

// Function with default parameters
run createUser(name, email, role = 'user') {
  return {
    name,
    email,
    role,
    createdAt: new Date()
  };
}

// Rest parameters
run sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Arrow functions (unchanged)
const multiply = (a, b) => a * b;
const processItems = (items) => items.map(item => item.name);
```

### **Function Types**

```javascript
// Regular function
run regularFunction() {
  return "Hello";
}

// Arrow function (unchanged)
const arrowFunction = () => "Hello";

// Generator function (unchanged)
function* generatorFunction() {
  yield 1;
  yield 2;
}

// Async function
later asyncFunction() {
  const result = hold fetch('/api/data');
  return hold result.json();
}
```

## Classes and Objects

### **Class Definition**

```javascript
// Basic class
model User {
  __init__(name, email) {
    self.name = name;
    self.email = email;
    self.createdAt = new Date();
  }

  run getInfo() {
    return `${self.name} (${self.email})`;
  }

  run updateEmail(newEmail) {
    self.email = newEmail;
    self.updatedAt = new Date();
  }
}

// Class inheritance
model Admin extends User {
  __init__(name, email, permissions) {
    super(name, email);
    self.permissions = permissions;
  }

  run hasPermission(permission) {
    return self.permissions.includes(permission);
  }
}

// Using classes
fixed user = fresh User("Alice", "alice@example.com");
fixed admin = fresh Admin("Bob", "bob@example.com", ["read", "write", "delete"]);
```

### **Object Literals**

```javascript
// Object creation
fixed person = {
  name: "Alice",
  age: 30,
  isActive: yes,

  // Method shorthand
  greet() {
    return `Hello, I'm ${self.name}`;
  }
};

// Object destructuring
fixed { name, age } = person;
fixed { name: userName, age: userAge } = person;

// Object spread
fixed updatedPerson = { ...person, age: 31 };
```

## Modules

### **Import Statements**

```javascript
// Named imports
use { useState, useEffect } from 'react';
use { format, parseISO } from 'date-fns';

// Default imports
use React from 'react';
use express from 'express';

// Mixed imports
use React, { useState, useEffect } from 'react';

// Renamed imports
use { useState as useLocalState } from 'react';

// Namespace imports
use * as utils from './utils.ns';
```

### **Export Statements**

```javascript
// Named exports
run formatDate(date) {
  return date.toLocaleDateString();
}

run validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

share { formatDate, validateEmail };

// Default export
run App() {
  return <div>Hello World</div>;
}

share default App;

// Re-exporting
share { formatDate } from './dateUtils.ns';
share default from './MainComponent.ns';
```

## Advanced Features

### **Template Literals**

```javascript
// Basic template literals (unchanged)
fixed name = "Alice";
fixed greeting = `Hello, ${name}!`;

// Multi-line strings
fixed multiLine = `
  This is a multi-line
  string in NullScript
  with ${name} as a variable
`;

// Tagged templates (unchanged)
run highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
  }, '');
}
```

### **Destructuring**

```javascript
// Array destructuring
fixed [first, second, ...rest] = [1, 2, 3, 4, 5];

// Object destructuring
fixed { name, age, ...otherProps } = person;

// Nested destructuring
fixed { address: { city, country } } = user;

// Default values
fixed { name = "Anonymous", age = 18 } = user;
```

### **Spread and Rest**

```javascript
// Array spread
fixed numbers = [1, 2, 3];
fixed moreNumbers = [...numbers, 4, 5];

// Object spread
fixed baseConfig = { timeout: 5000 };
fixed fullConfig = { ...baseConfig, retries: 3 };

// Rest parameters
run sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

// Rest destructuring
fixed [first, ...rest] = [1, 2, 3, 4, 5];
fixed { name, ...otherProps } = user;
```

### **Optional Chaining and Nullish Coalescing**

```javascript
// Optional chaining (unchanged)
const userName = user?.profile?.name;
const userAge = user?.profile?.age ?? 18;

// Nullish coalescing (unchanged)
const displayName = user.name ?? "Anonymous";
const retryCount = config.retries ?? 3;
```

## JavaScript Compatibility

### **What Works Unchanged**

```javascript
// All JavaScript syntax works
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((total, n) => total + n, 0);

// Modern JavaScript features
const { name, age } = person;
const [first, second] = array;
const newArray = [...oldArray, newItem];

// Async/await
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### **Mixed Usage**

```javascript
// Mix JavaScript and NullScript
function legacyFunction() {  // JavaScript function
  return "legacy";
}

run modernFunction() {        // NullScript function
  return "modern";
}

// Use both in the same file
const legacy = legacyFunction();
const modern = modernFunction();
speak.say(`${legacy} + ${modern}`);
```

## Testing Syntax

### **Jest Testing**

```javascript
// Test file: user.test.ns
use { User } from './user.ns';

describe('User Class', () => {
  test('should create user with name and email', () => {
    fixed user = fresh User("Alice", "alice@example.com");

    expect(user.name).toBe("Alice");
    expect(user.email).toBe("alice@example.com");
    expect(user.createdAt).toBeInstanceOf(Date);
  });

  test('should update email', () => {
    fixed user = fresh User("Alice", "alice@example.com");
    user.updateEmail("alice.new@example.com");

    expect(user.email).toBe("alice.new@example.com");
    expect(user.updatedAt).toBeInstanceOf(Date);
  });
});
```

## Common Pitfalls

### **1. Keyword Conflicts**

```javascript
// ❌ Don't use reserved keywords as variable names
let run = "function";        // 'run' is a keyword
let whatever = "if";         // 'whatever' is a keyword

// ✅ Use descriptive names instead
let functionName = "function";
let conditionType = "if";
```

### **2. Module Import/Export Consistency**

```javascript
// ❌ Mixing import styles
use { useState } from 'react';
import { useEffect } from 'react';  // Inconsistent

// ✅ Use consistent NullScript syntax
use { useState, useEffect } from 'react';
```

### **3. Boolean Value Usage**

```javascript
// ❌ Mixing boolean values
let isActive = true;         // JavaScript style
let isHidden = no;           // NullScript style

// ✅ Use consistent NullScript style
let isActive = yes;
let isHidden = no;
```

## Quick Reference Card

### **Essential Keywords**
```javascript
fixed    // const
let      // let (unchanged)
run      // function
speak.say()  // console.log()
yes      // true
no       // false
whatever // if
otherwise // else
when     // for
during   // while
model    // class
fresh    // new
self     // this
use      // import
share    // export
test     // try
grab     // catch
later    // async
hold     // await
```

### **Common Patterns**
```javascript
// Function declaration
run functionName(param) { ... }

// Conditional
whatever (condition) { ... } otherwise { ... }

// Loop
when (let i = 0; i < n; i++) { ... }

// Class
model ClassName { __init__() { ... } }

// Import/Export
use { name } from 'module';
share { name };
```

---

**Need more details on specific features?** 📖

[View Keywords](../keywords.md) | [Try Examples](../examples/basic.md) | [Use Playground](../playground.md)
