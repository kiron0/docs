# Advanced Examples

Explore advanced NullScript patterns and real-world scenarios.

## Advanced Function Patterns

### Higher-Order Functions

```javascript
// Function that returns a function
run createMultiplier(factor) {
  return (value) => value * factor;
}

fixed double = createMultiplier(2);
fixed triple = createMultiplier(3);

speak.say(double(5)); // 10
speak.say(triple(5)); // 15
```

### Currying

```javascript
run curry(fn) {
  return function curried(...args) {
    whatever (args.length >= fn.length) {
      return fn.apply(this, args);
    } otherwise {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// Example usage
run add(a, b, c) {
  return a + b + c;
}

fixed curriedAdd = curry(add);
fixed addFive = curriedAdd(5);
fixed addFiveAndThree = addFive(3);

speak.say(addFiveAndThree(2)); // 10
```

## Advanced Class Patterns

### Singleton Pattern

```javascript
model DatabaseConnection {
  __init__() {
    whatever (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    self.connection = null;
    DatabaseConnection.instance = self;
  }

  run connect() {
    whatever (!self.connection) {
      self.connection = fresh Connection();
      speak.say("Database connected");
    }
    return self.connection;
  }

  run disconnect() {
    whatever (self.connection) {
      self.connection.close();
      self.connection = null;
      speak.say("Database disconnected");
    }
  }
}

// Usage
fixed db1 = fresh DatabaseConnection();
fixed db2 = fresh DatabaseConnection();
speak.say(db1 === db2); // true
```

### Factory Pattern

```javascript
model VehicleFactory {
  run createVehicle(type, config) {
    whatever (type === "car") {
      return fresh Car(config);
    } otherwise whatever (type === "motorcycle") {
      return fresh Motorcycle(config);
    } otherwise whatever (type === "truck") {
      return fresh Truck(config);
    } otherwise {
      trigger fresh fail(`Unknown vehicle type: ${type}`);
    }
  }
}

model Car {
  __init__(config) {
    self.brand = config.brand;
    self.model = config.model;
    self.engine = "V6";
  }

  run start() {
    speak.say(`${self.brand} ${self.model} starting...`);
  }
}

model Motorcycle {
  __init__(config) {
    self.brand = config.brand;
    self.model = config.model;
    self.engine = "V-Twin";
  }

  run start() {
    speak.say(`${self.brand} ${self.model} revving up...`);
  }
}

// Usage
fixed factory = fresh VehicleFactory();
fixed car = factory.createVehicle("car", { brand: "Toyota", model: "Camry" });
fixed bike = factory.createVehicle("motorcycle", { brand: "Harley", model: "Sportster" });

car.start();
bike.start();
```

## Advanced Error Handling

### Custom Error Classes

```javascript
model ValidationError inherits fail {
  __init__(field, message) {
    super(`Validation failed for ${field}: ${message}`);
    self.field = field;
    self.message = message;
  }
}

model NetworkError inherits fail {
  __init__(url, status) {
    super(`Network request failed for ${url} with status ${status}`);
    self.url = url;
    self.status = status;
  }
}

run validateUser(user) {
  whatever (!user.name || user.name.length < 2) {
    trigger fresh ValidationError("name", "Name must be at least 2 characters");
  }

  whatever (!user.email || !user.email.includes("@")) {
    trigger fresh ValidationError("email", "Valid email is required");
  }

  whatever (!user.age || user.age < 18) {
    trigger fresh ValidationError("age", "User must be at least 18 years old");
  }
}

run processUser(userData) {
  test {
    validateUser(userData);
    speak.say("User validated successfully");
    return { success: yes, user: userData };
  } grab (error) {
    whatever (error instanceof ValidationError) {
      speak.scream(`Validation Error: ${error.message}`);
      return { success: no, error: error.message, field: error.field };
    } otherwise {
      speak.scream(`Unexpected error: ${error.message}`);
      return { success: no, error: "Internal server error" };
    }
  }
}
```

## Advanced Async Patterns

### Promise Utilities

```javascript
run delay(ms) {
  return fresh Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

run retry(fn, maxAttempts = 3, delayMs = 1000) {
  return async function retried(...args) {
    let lastError;

    since (let attempt = 1; attempt <= maxAttempts; attempt++) {
      test {
        return hold fn.apply(this, args);
      } grab (error) {
        lastError = error;
        speak.say(`Attempt ${attempt} failed: ${error.message}`);

        whatever (attempt < maxAttempts) {
          speak.say(`Retrying in ${delayMs}ms...`);
          hold delay(delayMs);
        }
      }
    }

    trigger lastError;
  };
}

// Usage
run later unreliableApiCall() {
  let random = Math.random();
  whatever (random < 0.7) {
    trigger fresh fail("API temporarily unavailable");
  }
  return "API response";
}

fixed reliableApiCall = retry(unreliableApiCall, 5, 2000);

run later testRetry() {
  test {
    let result = hold reliableApiCall();
    speak.say(`Success: ${result}`);
  } grab (error) {
    speak.scream(`All attempts failed: ${error.message}`);
  }
}
```

### Async Queue

```javascript
model AsyncQueue {
  __init__() {
    self.queue = [];
    self.processing = no;
  }

  run add(task) {
    return fresh Promise((resolve, reject) => {
      self.queue.push({ task, resolve, reject });
      self.process();
    });
  }

  run later process() {
    whatever (self.processing || self.queue.length === 0) {
      return;
    }

    self.processing = yes;

    since (self.queue.length > 0) {
      let { task, resolve, reject } = self.queue.shift();

      test {
        let result = hold task();
        resolve(result);
      } grab (error) {
        reject(error);
      }

      // Small delay between tasks
      hold delay(100);
    }

    self.processing = no;
  }
}

// Usage
fixed queue = fresh AsyncQueue();

run later simulateTask(id, duration) {
  speak.say(`Starting task ${id}`);
  hold delay(duration);
  speak.say(`Completed task ${id}`);
  return `Result from task ${id}`;
}

run later testQueue() {
  let promises = [
    queue.add(() => simulateTask(1, 1000)),
    queue.add(() => simulateTask(2, 500)),
    queue.add(() => simulateTask(3, 1500))
  ];

  let results = hold Promise.all(promises);
  speak.say("All tasks completed:", results);
}
```

## Advanced Data Structures

### Custom Map Implementation

```javascript
model CustomMap {
  __init__() {
    self.data = {};
    self.size = 0;
  }

  run set(key, value) {
    whatever (!self.has(key)) {
      self.size++;
    }
    self.data[key] = value;
    return self;
  }

  run get(key) {
    return self.data[key];
  }

  run has(key) {
    return self.data.hasOwnProperty(key);
  }

  run delete(key) {
    whatever (self.has(key)) {
      delete self.data[key];
      self.size--;
      return yes;
    }
    return no;
  }

  run clear() {
    self.data = {};
    self.size = 0;
  }

  run keys() {
    return Object.keys(self.data);
  }

  run values() {
    return Object.values(self.data);
  }

  run entries() {
    return Object.entries(self.data);
  }

  run forEach(callback) {
    since (fixed [key, value] part self.entries()) {
      callback(value, key, self);
    }
  }
}

// Usage
fixed userMap = fresh CustomMap();
userMap.set("alice", { name: "Alice", age: 25 });
userMap.set("bob", { name: "Bob", age: 30 });

userMap.forEach((user, key) => {
  speak.say(`${key}: ${user.name} (${user.age})`);
});
```

## Advanced Module Patterns

### Plugin System

```javascript
// plugin-manager.ns
model PluginManager {
  __init__() {
    self.plugins = new Map();
    self.hooks = new Map();
  }

  run register(name, plugin) {
    self.plugins.set(name, plugin);
    speak.say(`Plugin '${name}' registered`);
  }

  run addHook(hookName, callback) {
    whatever (!self.hooks.has(hookName)) {
      self.hooks.set(hookName, []);
    }
    self.hooks.get(hookName).push(callback);
  }

  run later executeHook(hookName, data) {
    whatever (self.hooks.has(hookName)) {
      let callbacks = self.hooks.get(hookName);
      since (fixed callback part callbacks) {
        data = hold callback(data);
      }
    }
    return data;
  }

  run getPlugin(name) {
    return self.plugins.get(name);
  }
}

// Usage example
fixed pluginManager = fresh PluginManager();

// Register a logging plugin
pluginManager.register("logger", {
  run log(message) {
    speak.say(`[LOG] ${new Date().toISOString()}: ${message}`);
  }
});

// Add hooks
pluginManager.addHook("beforeRequest", async (data) => {
  speak.say("Before request hook executed");
  return { ...data, timestamp: Date.now() };
});

pluginManager.addHook("afterResponse", async (data) => {
  speak.say("After response hook executed");
  return { ...data, processed: yes };
});

// Execute hooks
run later processRequest(requestData) {
  let enhancedData = hold pluginManager.executeHook("beforeRequest", requestData);
  // ... process request
  let responseData = { status: "success", data: enhancedData };
  return hold pluginManager.executeHook("afterResponse", responseData);
}
```

## Performance Optimization Examples

### Memoization

```javascript
run memoize(fn) {
  let cache = new Map();

  return function memoized(...args) {
    let key = JSON.stringify(args);

    whatever (cache.has(key)) {
      return cache.get(key);
    }

    let result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Example: Expensive calculation
run fibonacci(n) {
  whatever (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}

fixed memoizedFibonacci = memoize(fibonacci);

// First call is slow
let start = Date.now();
speak.say(memoizedFibonacci(40));
speak.say(`Time: ${Date.now() - start}ms`);

// Second call is instant
start = Date.now();
speak.say(memoizedFibonacci(40));
speak.say(`Time: ${Date.now() - start}ms`);
```

### Debouncing

```javascript
run debounce(fn, delay) {
  let timeoutId;

  return function debounced(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Example: Search input
fixed debouncedSearch = debounce((query) => {
  speak.say(`Searching for: ${query}`);
  // Perform actual search
}, 300);

// Simulate rapid input
debouncedSearch("a");
debouncedSearch("ab");
debouncedSearch("abc");
// Only "abc" will trigger the search
```

These advanced examples demonstrate complex patterns and real-world scenarios that showcase NullScript's capabilities while maintaining clean, readable code.
