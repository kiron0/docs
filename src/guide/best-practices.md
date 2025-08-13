# NullScript Best Practices

This guide outlines the recommended practices for writing clean, maintainable, and efficient NullScript code.

## Code Style

### Variable Declarations

Use the appropriate declaration keywords based on mutability:

```javascript
// Use fixed for constants
fixed PI = 3.14159;
fixed BASE_URL = "https://api.example.com";

// Use let for mutable variables
let count = 0;
let userInput;

// Avoid var unless necessary for legacy code
var oldVar = "legacy"; // Not recommended
```

### Function Declarations

Use clear function names:

```javascript
// Good: Clear name
run calculateTotal(prices) {
  return prices.reduce((sum, price) => sum + price, 0);
}

// Bad: Unclear name
run calc(p) {
  return p.reduce((s, p) => s + p, 0);
}

// For async functions, use later
run later fetchUserData(id) {
  let response = hold pull(`/api/users/${id}`);
  return hold response.json();
}
```

### Object Definitions

Write clear and descriptive objects:

```javascript
// Good: Clear property names
fixed user = {
  id: "123",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  dateOfBirth: null
};

// Bad: Unclear property names
fixed u = {
  i: "123",
  fn: "John",
  ln: "Doe",
  e: "john@example.com",
  d: null
};
```

## Error Handling

Use structured error handling with descriptive error messages:

```javascript
run processData(data) {
  test {
    let validated = validateData(data);
    return processValidData(validated);
  } grab (error) {
    whatever (error instanceof ValidationError) {
      logValidationError(error);
      return { success: no, error: error.message };
    } otherwise {
      speak.scream('Unexpected error:', error);
      return { success: no, error: 'Internal processing error' };
    }
  } atLast {
    cleanup();
  }
}
```

## Classes and Objects

### Class Structure

Organize class members logically:

```javascript
model UserManager {
  // 1. Properties
  __init__() {
    self.users = fresh Map();
  }

  // 2. Public methods
  run later getUser(id) {
    return hold self.fetchUser(id);
  }

  // 3. Private methods (convention)
  run later fetchUser(id) {
    // Implementation
  }
}
```

### Object Creation

Use appropriate patterns for object creation:

```javascript
// Factory function for complex objects
run createUser(data) {
  return {
    id: generateId(),
    ...data,
    createdAt: fresh Date(),
  };
}

// Builder pattern for optional properties
model RequestBuilder {
  __init__() {
    self.config = {};
  }

  run withTimeout(ms) {
    self.config.timeout = ms;
    return self;
  }

  run withHeaders(headers) {
    self.config.headers = { ...self.config.headers, ...headers };
    return self;
  }

  run build() {
    return fresh Request(self.config);
  }
}
```

## Performance Optimization

### Loop Optimization

Choose appropriate loop constructs:

```javascript
// For arrays, use map, filter, reduce
fixed doubled = numbers.map(n => n * 2);

// For simple iteration, use for...of
since (fixed item part items) {
  // Process item
}

// For object properties, use for...in with type check
since (fixed key inside object) {
  whatever (object.hasOwnProperty(key)) {
    // Process object[key]
  }
}
```

### Memory Management

Avoid memory leaks and manage resources properly:

```javascript
model ResourceManager {
  __init__() {
    self.resources = fresh Set();
  }

  run acquire() {
    let resource = fresh Resource();
    self.resources.add(resource);
    return resource;
  }

  run release(resource) {
    test {
      resource.close();
    } atLast {
      self.resources.delete(resource);
    }
  }
}
```

## Testing

Write comprehensive tests:

```javascript
// Test file: calculator.test.ns
use { describe, it, expect } from 'jest';
use { Calculator } from './calculator';

describe('Calculator', () => {
  fixed calc = fresh Calculator();

  it('should add numbers correctly', () => {
    let result = calc.add(2, 3);
    expect(result).toBe(5);
  });

  it('should handle negative numbers', () => {
    let result = calc.add(-2, 3);
    expect(result).toBe(1);
  });
});
```

## Documentation

Write clear and informative comments:

```javascript
/**
 * Processes user data and returns a formatted result.
 * @param data - The raw user data to process
 * @returns A formatted user object
 * @throws {ValidationError} If the data is invalid
 */
run processUserData(data) {
  // Implementation
}

// Use inline comments sparingly, only for complex logic
run calculateMetrics(data) {
  // Apply weighted average based on time decay
  let weights = data.map((_, i) => Math.exp(-i * 0.1));

  // Normalize weights to sum to 1
  let totalWeight = weights.reduce((sum, w) => sum + w, 0);

  return {
    // ... calculation implementation
  };
}
```

## Project Structure

Organize your project files logically:

```
src/
  ├── models/        # Data models
  ├── services/      # Business logic
  ├── utils/         # Utility functions
  ├── config/        # Configuration
  ├── tests/         # Test files
  └── main.ns        # Entry point
```

## Version Control

Follow good version control practices:

1. Write meaningful commit messages
2. Keep commits focused and atomic
3. Use feature branches
4. Review code before merging
5. Keep the main branch stable

## Security

Follow security best practices:

```javascript
// Input validation
run validateInput(data) {
  whatever (!data || typeof data !== 'object') {
    return no;
  }

  // Validate specific fields
  return data.hasOwnProperty('id') &&
         typeof data.id === 'string' &&
         data.id.length === 36; // UUID format
}

// Sanitize output
run sanitizeOutput(data) {
  return {
    id: data.id,
    name: data.name,
    // Exclude sensitive fields like password
  };
}
```

## Code Organization

### Module Structure

Organize your code into logical modules:

```javascript
// utils/math.ns
share run add(a, b) {
  return a + b;
}

share run multiply(a, b) {
  return a * b;
}

// main.ns
use { add, multiply } from './utils/math.ns';

let result = add(5, multiply(2, 3));
speak.say(result); // 11
```

### Configuration Management

Keep configuration separate from business logic:

```javascript
// config/settings.ns
share fixed config = {
  apiUrl: process.env.API_URL || 'https://api.example.com',
  timeout: parseInt(process.env.TIMEOUT) || 5000,
  debug: process.env.DEBUG === 'true'
};

// services/api.ns
use { config } from '../config/settings.ns';

run later fetchData(endpoint) {
  let response = hold pull(`${config.apiUrl}${endpoint}`, {
    timeout: config.timeout
  });
  return hold response.json();
}
```

## Debugging

Use effective debugging techniques:

```javascript
// Use speak.say for debugging
run debugFunction(data) {
  speak.say('Input data:', data);

  let processed = processData(data);
  speak.say('Processed result:', processed);

  return processed;
}

// Use conditional debugging
whatever (config.debug) {
  speak.say('Debug info:', debugInfo);
}
```

## Performance Tips

1. **Use appropriate data structures**
2. **Avoid unnecessary object creation**
3. **Cache expensive computations**
4. **Use async/await properly**
5. **Profile your code regularly**

Remember: NullScript compiles to JavaScript, so all JavaScript performance best practices apply!
