# NullScript Playground

Try NullScript code live in your browser! This playground shows you how NullScript code compiles to JavaScript.

## Quick Try

::: tip Interactive Testing
Open your browser's developer console (F12) and copy-paste the examples below to see them in action!
:::

## Example Snippets

### Basic Function
```javascript
run add(a, b) {
  return a + b;
}

fixed result = add(5, 3);
speak.say(`Result: ${result}`);
```

**Compiles to:**
```javascript
function add(a, b) {
  return a + b;
}

const result = add(5, 3);
console.log(`Result: ${result}`);
```

### Control Flow
```javascript
run checkNumber(num) {
  whatever (num > 0) {
    speak.say("Positive number");
  } otherwise whatever (num < 0) {
    speak.say("Negative number");
  } otherwise {
    speak.say("Zero");
  }
}

checkNumber(42);
checkNumber(-5);
checkNumber(0);
```

**Compiles to:**
```javascript
function checkNumber(num) {
  if (num > 0) {
    console.log("Positive number");
  } else if (num < 0) {
    console.log("Negative number");
  } else {
    console.log("Zero");
  }
}

checkNumber(42);
checkNumber(-5);
checkNumber(0);
```

### Classes
```javascript
model Calculator {
  __init__() {
    self.history = [];
  }

  run add(a, b) {
    let result = a + b;
    self.history.push(`${a} + ${b} = ${result}`);
    return result;
  }

  run showHistory() {
    since (fixed entry part self.history) {
      speak.say(entry);
    }
  }
}

fixed calc = fresh Calculator();
calc.add(10, 5);
calc.add(20, 30);
calc.showHistory();
```

**Compiles to:**
```javascript
class Calculator {
  constructor() {
    this.history = [];
  }

  add(a, b) {
    let result = a + b;
    this.history.push(`${a} + ${b} = ${result}`);
    return result;
  }

  showHistory() {
    for (const entry of this.history) {
      console.log(entry);
    }
  }
}

const calc = new Calculator();
calc.add(10, 5);
calc.add(20, 30);
calc.showHistory();
```

### Async Functions
```javascript
run later simulateApiCall(data) {
  // Simulate network delay
  hold new Promise(resolve => setTimeout(resolve, 1000));
  return `Processed: ${data}`;
}

run later main() {
  speak.say("Starting API call...");
  let result = hold simulateApiCall("Hello World");
  speak.say(result);
}

main();
```

**Compiles to:**
```javascript
async function simulateApiCall(data) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  return `Processed: ${data}`;
}

async function main() {
  console.log("Starting API call...");
  let result = await simulateApiCall("Hello World");
  console.log(result);
}

main();
```

### Error Handling
```javascript
run safeDivide(a, b) {
  test {
    whatever (b === 0) {
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

fixed result = safeDivide(10, 2);
speak.say(`Result: ${result}`);
```

**Compiles to:**
```javascript
function safeDivide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Division by zero!");
    }
    return a / b;
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return null;
  } finally {
    console.log("Division operation completed");
  }
}

const result = safeDivide(10, 2);
console.log(`Result: ${result}`);
```

## Try It Yourself

### Step 1: Manual Transpilation
Copy any NullScript code from above and manually replace the keywords:

| NullScript | JavaScript |
|------------|------------|
| `run` | `function` |
| `fixed` | `const` |
| `speak.say` | `console.log` |
| `speak.scream` | `console.error` |
| `whatever` | `if` |
| `otherwise` | `else` |
| `since` | `for` |
| `when` | `while` |
| `test` | `try` |
| `grab` | `catch` |
| `atLast` | `finally` |
| `trigger` | `throw` |
| `fresh` | `new` |
| `model` | `class` |
| `__init__` | `constructor` |
| `self` | `this` |
| `later` | `async` |
| `hold` | `await` |

### Step 2: Test in Console
1. Open browser developer tools (F12)
2. Go to the Console tab
3. Paste your compiled JavaScript code
4. Press Enter to execute

### Step 3: Experiment
Try these variations:
- Change function names and parameters
- Add more complex logic
- Test error conditions
- Try different data types

## Advanced Examples

### Higher-Order Functions
```javascript
run createMultiplier(factor) {
  return (value) => value * factor;
}

fixed double = createMultiplier(2);
fixed triple = createMultiplier(3);

speak.say(double(5)); // 10
speak.say(triple(5)); // 15
```

### Custom Error Classes
```javascript
model ValidationError inherits fail {
  __init__(field, message) {
    super(`Validation failed for ${field}: ${message}`);
    self.field = field;
    self.message = message;
  }
}

run validateUser(user) {
  whatever (!user.name || user.name.length < 2) {
    trigger fresh ValidationError("name", "Name must be at least 2 characters");
  }

  whatever (!user.email || !user.email.includes("@")) {
    trigger fresh ValidationError("email", "Valid email is required");
  }
}

test {
  validateUser({ name: "A", email: "invalid" });
} grab (error) {
  speak.scream(`Validation Error: ${error.message}`);
}
```

## Features

- **Real-time Examples**: See NullScript code alongside compiled JavaScript
- **Interactive Testing**: Use browser console to test code immediately
- **Comprehensive Coverage**: Examples for all major language features
- **Error Handling**: Learn how to handle errors in NullScript

## How to Use

1. **Choose an Example**: Pick any example from above
2. **Understand the Mapping**: See how NullScript keywords map to JavaScript
3. **Test in Console**: Copy the JavaScript version and run it
4. **Experiment**: Modify the code and see what happens

## Tips

- Start with simple functions and gradually try more complex patterns
- Use the keyword mapping table as a reference
- Check the browser console for output and errors
- Try mixing NullScript and JavaScript syntax to see the differences
- Experiment with different data types and control flow patterns

## Future Enhancements

The playground can be enhanced with:

- **Online Editor**: Full-featured code editor with syntax highlighting
- **Auto-compilation**: Real-time transpilation as you type
- **Code Sharing**: Share code snippets via URL
- **Mobile Support**: Touch-friendly interface for mobile devices
- **Advanced Features**: Debugging tools and performance profiling

For now, this manual approach gives you a hands-on way to experiment with NullScript and understand how it compiles to JavaScript!
