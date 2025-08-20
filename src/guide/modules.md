# Module System

> **Organize and structure your NullScript code with an intuitive module system**

NullScript provides a clean and expressive module system using `use`, `share`, and `from` keywords. This guide covers everything from basic imports to advanced module patterns.

## Core Module Keywords

| NullScript | JavaScript | Description                           |
| ---------- | ---------- | ------------------------------------- |
| `use`      | `import`   | Import modules and exports            |
| `share`    | `export`   | Export functions, classes, and values |
| `from`     | `from`     | Specify import source (unchanged)     |

## Basic Module Operations

### Exporting Values

```javascript
// math.ns
share run add(a, b) {
    return a + b;
}

share run subtract(a, b) {
    return a - b;
}

share fixed PI = 3.14159;
share fixed E = 2.71828;

// Default export
share default run multiply(a, b) {
    return a * b;
}
```

### Importing Values

```javascript
// main.ns
use { add, subtract, PI } from './math.ns';
use multiply from './math.ns';  // Default import

run calculate() {
    let sum = add(5, 3);
    let difference = subtract(10, 4);
    let product = multiply(6, 7);

    speak.say(`Sum: ${sum}, Difference: ${difference}, Product: ${product}`);
    speak.say(`PI: ${PI}`);
}
```

## Advanced Import Patterns

### Named Imports

```javascript
// utils.ns
share run formatDate(date) {
    return date.toLocaleDateString();
}

share run validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

share run capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// main.ns
use { formatDate, validateEmail, capitalize } from './utils.ns';

run processUser(user) {
    let formattedDate = formatDate(user.createdAt);
    let isValidEmail = validateEmail(user.email);
    let displayName = capitalize(user.name);

    return { formattedDate, isValidEmail, displayName };
}
```

### Default Imports

```javascript
// User.ns
model User {
    __init__(name, email) {
        self.name = name;
        self.email = email;
        self.createdAt = new Date();
    }

    run getDisplayName() {
        return self.name;
    }
}

share default User;

// main.ns
use User from './User.ns';

run createUser(name, email) {
    return fresh User(name, email);
}
```

### Mixed Imports

```javascript
// react-components.ns
use React from 'react';
share { Button, Input, Modal } from './components.ns';
share default App from './App.ns';

// main.ns
use React, { Button, Input, Modal } from './react-components.ns';
use App from './react-components.ns';
```

### Namespace Imports

```javascript
// math-utils.ns
share run add(a, b) { return a + b; }
share run subtract(a, b) { return a - b; }
share run multiply(a, b) { return a * b; }
share run divide(a, b) { return a / b; }

// main.ns
use * as MathUtils from './math-utils.ns';

run calculate() {
    let sum = MathUtils.add(10, 5);
    let product = MathUtils.multiply(4, 6);

    return { sum, product };
}
```

### Re-exporting

```javascript
// index.ns - Barrel export
share { add, subtract } from './math.ns';
share { formatDate, validateEmail } from './utils.ns';
share { User, Admin } from './models.ns';
share default App from './App.ns';

// main.ns
use { add, formatDate, User } from './index.ns';
```

## Module Organization Patterns

### Feature-Based Organization

```
src/
├── features/
│   ├── auth/
│   │   ├── auth.ns          # Auth logic
│   │   ├── auth.types.ns    # Auth types
│   │   ├── auth.utils.ns    # Auth utilities
│   │   └── index.ns         # Barrel export
│   ├── users/
│   │   ├── user.ns          # User logic
│   │   ├── user.types.ns    # User types
│   │   └── index.ns         # Barrel export
│   └── posts/
│       ├── post.ns          # Post logic
│       └── index.ns         # Barrel export
├── shared/
│   ├── utils.ns             # Common utilities
│   ├── constants.ns         # Shared constants
│   └── types.ns             # Shared types
└── main.ns                  # Main application
```

### Layer-Based Organization

```
src/
├── presentation/             # UI components
│   ├── components.ns
│   ├── pages.ns
│   └── layouts.ns
├── business/                 # Business logic
│   ├── services.ns
│   ├── validators.ns
│   └── transformers.ns
├── data/                     # Data access
│   ├── repositories.ns
│   ├── api.ns
│   └── storage.ns
└── domain/                   # Domain models
    ├── entities.ns
    ├── value-objects.ns
    └── enums.ns
```

## Module Configuration

### Package.json Configuration

```json
{
  "name": "my-nullscript-app",
  "type": "module",
  "exports": {
    ".": "./src/index.ns",
    "./components": "./src/components/index.ns",
    "./utils": "./src/utils/index.ns"
  },
  "imports": {
    "#internal/*": "./src/internal/*.ns",
    "#shared/*": "./src/shared/*.ns"
  }
}
```

### Import Maps (Browser)

```html
<script type="importmap">
  {
    "imports": {
      "nullscript/": "/node_modules/nullscript/",
      "@app/": "/src/",
      "@shared/": "/src/shared/"
    }
  }
</script>

<script type="module">
  import { User } from "@app/models/User.ns";
  import { utils } from "@shared/utils.ns";
</script>
```

## Advanced Module Patterns

### Dynamic Imports

```javascript
run later loadModule(moduleName) {
    test {
        let module = hold import(`./modules/${moduleName}.ns`);
        return module;
    } grab (error) {
        speak.scream(`Failed to load module ${moduleName}:`, error.message);
        return null;
    }
}

// Usage
run later example() {
    let userModule = hold loadModule('user');
    if (userModule) {
        let User = userModule.default;
        return fresh User("Alice", "alice@example.com");
    }
}
```

### Conditional Imports

```javascript
// feature-flags.ns
share fixed FEATURES = {
    advancedSearch: true,
    darkMode: false,
    analytics: true
};

// conditional-imports.ns
use { FEATURES } from './feature-flags.ns';

let searchModule = null;
if (FEATURES.advancedSearch) {
    searchModule = await import('./advanced-search.ns');
}

let analyticsModule = null;
if (FEATURES.analytics) {
    analyticsModule = await import('./analytics.ns');
}
```

### Module Factories

```javascript
// module-factory.ns
run createModule(config) {
    return {
        run init() {
            speak.say("Module initialized with config:", config);
        },

        run process(data) {
            return data.map(item => item * config.multiplier);
        }
    };
}

// main.ns
use { createModule } from './module-factory.ns';

let config1 = { multiplier: 2 };
let config2 = { multiplier: 10 };

let module1 = createModule(config1);
let module2 = createModule(config2);

let result1 = module1.process([1, 2, 3]);  // [2, 4, 6]
let result2 = module2.process([1, 2, 3]);  // [10, 20, 30]
```

### Plugin System

```javascript
// plugin-interface.ns
share run createPlugin(name, handler) {
    return {
        name,
        handler,
        run execute(data) {
            return self.handler(data);
        }
    };
}

// plugins/
// ├── logger.ns
share default createPlugin('logger', (data) => {
    speak.say('Logging:', data);
    return data;
});

// ├── transformer.ns
share default createPlugin('transformer', (data) => {
    return data.toUpperCase();
});

// main.ns
use createPlugin from './plugin-interface.ns';
use loggerPlugin from './plugins/logger.ns';
use transformerPlugin from './plugins/transformer.ns';

let plugins = [loggerPlugin, transformerPlugin];

run processWithPlugins(data) {
    let result = data;

    for (let plugin of plugins) {
        result = plugin.execute(result);
    }

    return result;
}
```

## Module Privacy and Encapsulation

### Private Members

```javascript
// counter.ns
let privateCount = 0;  // Private variable

share run increment() {
    privateCount++;
    return privateCount;
}

share run getCount() {
    return privateCount;
}

// Private function (not exported)
run resetCount() {
    privateCount = 0;
}

// main.ns
use { increment, getCount } from './counter.ns';

increment();  // ✅ Public
increment();  // ✅ Public
speak.say(getCount());  // ✅ Public
// resetCount();  // ❌ Private - not accessible
```

### Module Closures

```javascript
// calculator.ns
share run createCalculator() {
    let history = [];  // Private state

    return {
        run add(a, b) {
            let result = a + b;
            history.push({ operation: 'add', a, b, result });
            return result;
        },

        run getHistory() {
            return [...history];  // Return copy, not reference
        },

        run clearHistory() {
            history = [];
        }
    };
}

// main.ns
use { createCalculator } from './calculator.ns';

let calc = createCalculator();
calc.add(5, 3);      // 8
calc.add(10, 20);    // 30
speak.say(calc.getHistory());  // Shows operation history
```

## Testing Modules

### Unit Testing

```javascript
// math.test.ns
use { add, subtract, PI } from './math.ns';

describe('Math Module', () => {
    test('should add two numbers correctly', () => {
        expect(add(2, 3)).toBe(5);
        expect(add(-1, 1)).toBe(0);
        expect(add(0, 0)).toBe(0);
    });

    test('should subtract two numbers correctly', () => {
        expect(subtract(5, 3)).toBe(2);
        expect(subtract(1, 1)).toBe(0);
        expect(subtract(0, 5)).toBe(-5);
    });

    test('should export constants correctly', () => {
        expect(PI).toBe(3.14159);
    });
});
```

### Mocking Modules

```javascript
// user-service.test.ns
use { UserService } from './user-service.ns';

// Mock the API module
jest.mock('./api.ns', () => ({
    fetchUser: jest.fn(),
    createUser: jest.fn()
}));

use { fetchUser, createUser } from './api.ns';

describe('UserService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should create user successfully', async () => {
        const mockUser = { id: 1, name: 'Alice', email: 'alice@example.com' };
        createUser.mockResolvedValue(mockUser);

        const userService = new UserService();
        const result = await userService.createUser('Alice', 'alice@example.com');

        expect(result).toEqual(mockUser);
        expect(createUser).toHaveBeenCalledWith('Alice', 'alice@example.com');
    });
});
```

## Performance Optimization

### Tree Shaking

```javascript
// utils.ns - Good for tree shaking
share run add(a, b) { return a + b; }
share run subtract(a, b) { return a - b; }
share run multiply(a, b) { return a * b; }
share run divide(a, b) { return a / b; }

// main.ns - Only imports what's needed
use { add, multiply } from './utils.ns';
// subtract and divide are not included in the bundle
```

### Lazy Loading

```javascript
// lazy-loading.ns
run later loadHeavyModule() {
    let module = hold import('./heavy-module.ns');
    return module;
}

// Only load when needed
run later processData(data) {
    if (data.length > 1000) {
        let heavyModule = hold loadHeavyModule();
        return heavyModule.processLargeDataset(data);
    }

    return processSmallDataset(data);
}
```

### Module Preloading

```javascript
// Preload critical modules
let criticalModules = [
    import('./auth.ns'),
    import('./core.ns')
];

run later initializeApp() {
    let [authModule, coreModule] = hold Promise.all(criticalModules);

    // Modules are already loaded
    authModule.initialize();
    coreModule.initialize();
}
```

## Related Topics

- **[Basic Concepts](../guide/basic-concepts.md)** - Foundation of NullScript
- **[Classes](../guide/classes.md)** - Object-oriented programming
- **[Best Practices](../guide/best-practices.md)** - Code organization
- **[Testing](../guide/best-practices.md#testing)** - Testing modules

---

**Next Steps**: Practice module organization in the [Playground](../playground.md) or explore [Advanced Examples](../examples/advanced.md) for complex module patterns.
