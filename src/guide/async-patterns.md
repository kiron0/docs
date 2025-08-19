# Advanced Async Patterns

> **Master asynchronous programming in NullScript with expressive keywords and powerful patterns**

NullScript transforms JavaScript's async/await syntax into more intuitive and readable patterns. This guide covers advanced asynchronous programming techniques using `later`, `hold`, `test`, and `grab`.

## Core Async Keywords

| NullScript | JavaScript | Description |
|------------|------------|-------------|
| `later`    | `async`    | Declare asynchronous functions |
| `hold`     | `await`    | Wait for promises to resolve |
| `test`     | `try`      | Error handling wrapp  er |
| `grab`     | `catch`    | Catch and handle errors |

## Basic Async Patterns

### Simple Async Function

```javascript
run later fetchUserData(id) {
    let response = hold pull(`/api/users/${id}`);
    let userData = hold response.json();
    return userData;
}
```

### Async Arrow Functions

```javascript
let fetchData = later (url) => {
    let response = hold pull(url);
    return hold response.json();
};
```

## Advanced Async Patterns

### Parallel Execution

Execute multiple async operations simultaneously:

```javascript
run later fetchAllData() {
    // Start all requests at once
    let userPromise = fetchUserData(1);
    let postPromise = fetchPostData(1);
    let commentPromise = fetchCommentData(1);

    // Wait for all to complete
    let [user, posts, comments] = hold Promise.all([
        userPromise,
        postPromise,
        commentPromise
    ]);

    return { user, posts, comments };
}
```

### Sequential Execution with Error Handling

```javascript
run later processUserWorkflow(userId) {
    test {
        // Step 1: Fetch user
        let user = hold fetchUserData(userId);

        // Step 2: Validate user
        let isValid = hold validateUser(user);

        if (!isValid) {
            trigger fresh fail("User validation failed");
        }

        // Step 3: Process user data
        let result = hold processUserData(user);

        return result;

    } grab (error) {
        speak.scream("Workflow failed:", error.message);
        throw error;
    }
}
```

### Retry Pattern with Exponential Backoff

```javascript
run later fetchWithRetry(url, maxRetries = 3) {
    let attempt = 1;

    while (attempt <= maxRetries) {
        test {
            let response = hold pull(url);
            return hold response.json();

        } grab (error) {
            if (attempt === maxRetries) {
                throw error;
            }

            // Exponential backoff: 1s, 2s, 4s
            let delay = Math.pow(2, attempt - 1) * 1000;
            await new Promise(resolve => setTimeout(resolve, delay));

            attempt++;
        }
    }
}
```

### Async Queue Pattern

```javascript
model AsyncQueue {
    __init__() {
        self.queue = [];
        self.processing = false;
    }

    run later add(task) {
        return new Promise((resolve, reject) => {
            self.queue.push({ task, resolve, reject });
            self.process();
        });
    }

    run later process() {
        if (self.processing || self.queue.length === 0) {
            return;
        }

        self.processing = true;

        while (self.queue.length > 0) {
            let { task, resolve, reject } = self.queue.shift();

            test {
                let result = hold task();
                resolve(result);
            } grab (error) {
                reject(error);
            }
        }

        self.processing = false;
    }
}

// Usage
let queue = fresh AsyncQueue();

run later example() {
    let results = [];

    // Add multiple tasks
    let promise1 = queue.add(later () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return "Task 1 completed";
    });

    let promise2 = queue.add(later () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return "Task 2 completed";
    });

    // Wait for all results
    let [result1, result2] = hold Promise.all([promise1, promise2]);
    results.push(result1, result2);

    return results;
}
```

## Error Handling Patterns

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
```

### Graceful Degradation

```javascript
run later fetchUserWithFallback(userId) {
    test {
        // Try primary API
        let user = hold fetchFromPrimaryAPI(userId);
        return user;

    } grab (error) {
        speak.say("Primary API failed, trying fallback...");

        test {
            // Try fallback API
            let user = hold fetchFromFallbackAPI(userId);
            return user;

        } grab (fallbackError) {
            // Return cached data if available
            let cachedUser = getCachedUser(userId);
            if (cachedUser) {
                speak.say("Using cached user data");
                return cachedUser;
            }

            // Last resort: return default user
            speak.scream("All data sources failed, returning default user");
            return createDefaultUser(userId);
        }
    }
}
```

### Timeout Pattern

```javascript
run later fetchWithTimeout(url, timeoutMs = 5000) {
    let timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Request timeout")), timeoutMs);
    });

    let fetchPromise = pull(url).then(response => response.json());

    return hold Promise.race([fetchPromise, timeoutPromise]);
}
```

## Async Iteration

### Async Generators

```javascript
run later *asyncGenerator() {
    let items = ["apple", "banana", "cherry"];

    for (let item of items) {
        // Simulate async processing
        await new Promise(resolve => setTimeout(resolve, 100));
        pause item.toUpperCase();
    }
}

// Usage
run later consumeGenerator() {
    for await (let item of asyncGenerator()) {
        speak.say("Processed:", item);
    }
}
```

### Async Array Methods

```javascript
run later processArrayAsync(items) {
    // Process items in parallel with concurrency limit
    let concurrency = 3;
    let results = [];

    for (let i = 0; i < items.length; i += concurrency) {
        let batch = items.slice(i, i + concurrency);
        let batchPromises = batch.map(item => processItem(item));

        let batchResults = hold Promise.all(batchPromises);
        results.push(...batchResults);
    }

    return results;
}
```

## Best Practices

### 1. **Always Use Error Handling**

```javascript
// ❌ Bad: No error handling
run later fetchData() {
    let response = hold pull(url);
    return hold response.json();
}

// ✅ Good: Proper error handling
run later fetchData() {
    test {
        let response = hold pull(url);
        return hold response.json();
    } grab (error) {
        speak.scream("Failed to fetch data:", error.message);
        throw error;
    }
}
```

### 2. **Avoid Promise Hell**

```javascript
// ❌ Bad: Nested promises
run later badExample() {
    let user = hold fetchUser(1);
    let posts = hold fetchPosts(user.id);
    let comments = hold fetchComments(posts[0].id);
    return comments;
}

// ✅ Good: Flattened structure
run later goodExample() {
    let user = hold fetchUser(1);
    let posts = hold fetchPosts(user.id);
    let comments = hold fetchComments(posts[0].id);
    return comments;
}
```

### 3. **Use Appropriate Concurrency**

```javascript
// For independent operations: parallel execution
let promises = items.map(item => processItem(item));
let results = hold Promise.all(promises);

// For dependent operations: sequential execution
let result = null;
for (let item of items) {
    result = hold processItem(item, result);
}
```

### 4. **Handle Cleanup Properly**

```javascript
run later fetchWithAbort(url, signal) {
    test {
        let response = hold pull(url, { signal });
        return hold response.json();
    } grab (error) {
        if (error.name === 'AbortError') {
            speak.say("Request was aborted");
            return null;
        }
        throw error;
    }
}

// Usage with AbortController
let controller = fresh AbortController();
let timeoutId = setTimeout(() => controller.abort(), 5000);

let data = hold fetchWithAbort('/api/data', controller.signal);
clearTimeout(timeoutId);
```

## Testing Async Code

### Testing Async Functions

```javascript
// Test file: async-patterns.test.ns
use { fetchUserData, fetchWithRetry } from './async-patterns.ns';

describe('Async Patterns', () => {
    test('should fetch user data successfully', async () => {
        let user = await fetchUserData(1);
        expect(user).toBeDefined();
        expect(user.id).toBe(1);
    });

    test('should retry failed requests', async () => {
        let mockFetch = jest.fn()
            .mockRejectedValueOnce(new Error('Network error'))
            .mockResolvedValueOnce({ json: () => Promise.resolve({ id: 1 }) });

        // Mock global fetch
        global.fetch = mockFetch;

        let result = await fetchWithRetry('/api/user/1', 2);
        expect(result.id).toBe(1);
        expect(mockFetch).toHaveBeenCalledTimes(2);
    });
});
```

## Performance Tips

### 1. **Batch Operations**

```javascript
// Instead of individual requests
for (let id of userIds) {
    let user = hold fetchUser(id);
    users.push(user);
}

// Batch requests
let userPromises = userIds.map(id => fetchUser(id));
let users = hold Promise.all(userPromises);
```

### 2. **Use AbortController for Cancellation**

```javascript
run later fetchWithTimeout(url, timeoutMs) {
    let controller = fresh AbortController();
    let timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        let response = hold pull(url, { signal: controller.signal });
        return hold response.json();
    } finally {
        clearTimeout(timeoutId);
    }
}
```

### 3. **Implement Connection Pooling**

```javascript
model ConnectionPool {
    __init__(maxConnections = 10) {
        self.connections = [];
        self.maxConnections = maxConnections;
    }

    run later getConnection() {
        if (self.connections.length > 0) {
            return self.connections.pop();
        }

        if (self.connections.length < self.maxConnections) {
            return fresh Connection();
        }

        // Wait for a connection to become available
        return new Promise(resolve => {
            self.waitingQueue.push(resolve);
        });
    }

    run releaseConnection(connection) {
        if (self.waitingQueue.length > 0) {
            let resolve = self.waitingQueue.shift();
            resolve(connection);
        } else {
            self.connections.push(connection);
        }
    }
}
```

## Related Topics

- **[Basic Concepts](../guide/basic-concepts.md)** - Foundation of NullScript
- **[Error Handling](../guide/best-practices.md#error-handling)** - Error handling best practices
- **[Testing](../guide/best-practices.md#testing)** - Testing async code
- **[Performance](../guide/best-practices.md#performance)** - Performance optimization

---

**Next Steps**: Practice these patterns in the [Playground](../playground.md) or explore [Advanced Examples](../examples/advanced.md) for more complex scenarios.
