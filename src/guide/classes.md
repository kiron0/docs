# Class System

> **Master object-oriented programming in NullScript with expressive and intuitive class syntax**

NullScript transforms JavaScript's class syntax into more readable and expressive patterns using `model`, `self`, `__init__`, and other intuitive keywords. This guide covers everything from basic classes to advanced inheritance patterns.

## Core Class Keywords

| NullScript | JavaScript | Description |
|------------|------------|-------------|
| `model`    | `class`    | Define a class |
| `__init__` | `constructor` | Class constructor |
| `self`     | `this`     | Reference to current instance |
| `inherits` | `extends`  | Class inheritance |
| `fresh`    | `new`      | Create new instance |
| `super`    | `super`    | Call parent constructor/method |

## Basic Class Definition

### Simple Class

```javascript
model Calculator {
    __init__() {
        self.result = 0;
    }

    run add(value) {
        self.result += value;
        return self;
    }

    run subtract(value) {
        self.result -= value;
        return self;
    }

    run getResult() {
        return self.result;
    }
}

// Usage
let calc = fresh Calculator();
calc.add(5).subtract(2);
speak.say("Result:", calc.getResult());  // 3
```

### Class with Parameters

```javascript
model User {
    __init__(name, email, role = 'user') {
        self.name = name;
        self.email = email;
        self.role = role;
        self.createdAt = new Date();
        self.isActive = true;
    }

    run getDisplayName() {
        return `${self.name} (${self.email})`;
    }

    run updateEmail(newEmail) {
        self.email = newEmail;
        self.updatedAt = new Date();
    }

    run deactivate() {
        self.isActive = false;
        self.deactivatedAt = new Date();
    }
}

// Usage
let user = fresh User("Alice", "alice@example.com", "admin");
speak.say(user.getDisplayName());  // "Alice (alice@example.com)"
user.updateEmail("alice.new@example.com");
```

## Inheritance and Polymorphism

### Basic Inheritance

```javascript
model Person {
    __init__(name, age) {
        self.name = name;
        self.age = age;
    }

    run introduce() {
        return `Hi, I'm ${self.name} and I'm ${self.age} years old.`;
    }

    run getBirthYear() {
        let currentYear = new Date().getFullYear();
        return currentYear - self.age;
    }
}

model Student inherits Person {
    __init__(name, age, studentId, major) {
        super(name, age);  // Call parent constructor
        self.studentId = studentId;
        self.major = major;
        self.courses = [];
    }

    run addCourse(course) {
        self.courses.push(course);
    }

    run introduce() {
        let baseIntro = super.introduce();  // Call parent method
        return `${baseIntro} I'm studying ${self.major} with ID ${self.studentId}.`;
    }
}

// Usage
let student = fresh Student("Bob", 20, "S12345", "Computer Science");
student.addCourse("Programming 101");
speak.say(student.introduce());
speak.say("Birth year:", student.getBirthYear());
```

### Method Overriding

```javascript
model Animal {
    __init__(name) {
        self.name = name;
    }

    run makeSound() {
        return "Some animal sound";
    }

    run move() {
        return `${self.name} is moving`;
    }
}

model Dog inherits Animal {
    __init__(name, breed) {
        super(name);
        self.breed = breed;
    }

    run makeSound() {
        return "Woof! Woof!";
    }

    run fetch() {
        return `${self.name} is fetching the ball`;
    }
}

model Cat inherits Animal {
    __init__(name, color) {
        super(name);
        self.color = color;
    }

    run makeSound() {
        return "Meow!";
    }

    run climb() {
        return `${self.name} is climbing the tree`;
    }
}

// Polymorphism in action
let animals = [
    fresh Dog("Buddy", "Golden Retriever"),
    fresh Cat("Whiskers", "Orange"),
    fresh Animal("Generic Animal")
];

for (let animal of animals) {
    speak.say(`${animal.name}: ${animal.makeSound()}`);
    speak.say(animal.move());
}
```

## Advanced Class Patterns

### Abstract Base Classes

```javascript
model DatabaseConnection {
    __init__() {
        if (self.constructor === DatabaseConnection) {
            trigger fresh fail("DatabaseConnection is abstract and cannot be instantiated");
        }
    }

    run connect() {
        trigger fresh fail("connect() method must be implemented by subclass");
    }

    run disconnect() {
        trigger fresh fail("disconnect() method must be implemented by subclass");
    }

    run query(sql) {
        trigger fresh fail("query() method must be implemented by subclass");
    }
}

model MySQLConnection inherits DatabaseConnection {
    __init__(host, port, database, username, password) {
        super();
        self.host = host;
        self.port = port;
        self.database = database;
        self.username = username;
        self.password = password;
        self.connection = null;
    }

    run connect() {
        // Simulate MySQL connection
        self.connection = { status: 'connected', host: self.host };
        speak.say(`Connected to MySQL at ${self.host}:${self.port}`);
    }

    run disconnect() {
        if (self.connection) {
            self.connection = null;
            speak.say("Disconnected from MySQL");
        }
    }

    run query(sql) {
        if (!self.connection) {
            trigger fresh fail("Not connected to database");
        }
        return `Executed: ${sql}`;
    }
}
```

### Singleton Pattern

```javascript
model DatabaseConnection {
    __init__() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }

        self.connection = null;
        DatabaseConnection.instance = self;
    }

    run connect() {
        if (!self.connection) {
            self.connection = { status: 'connected' };
            speak.say("Database connected");
        }
        return self.connection;
    }

    run disconnect() {
        if (self.connection) {
            self.connection = null;
            speak.say("Database disconnected");
        }
    }
}

// Usage - always returns the same instance
let db1 = fresh DatabaseConnection();
let db2 = fresh DatabaseConnection();
speak.say(db1 === db2);  // true
```

### Factory Pattern

```javascript
model VehicleFactory {
    run createVehicle(type, config) {
        whatever (type === 'car') {
            return fresh Car(config);
        } otherwise whatever (type === 'motorcycle') {
            return fresh Motorcycle(config);
        } otherwise whatever (type === 'truck') {
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
let factory = fresh VehicleFactory();
let car = factory.createVehicle("car", { brand: "Toyota", model: "Camry" });
let bike = factory.createVehicle("motorcycle", { brand: "Harley", model: "Sportster" });

car.start();
bike.start();
```

### Observer Pattern

```javascript
model EventEmitter {
    __init__() {
        self.events = {};
    }

    run on(event, callback) {
        if (!self.events[event]) {
            self.events[event] = [];
        }
        self.events[event].push(callback);
    }

    run emit(event, data) {
        if (self.events[event]) {
            for (let callback of self.events[event]) {
                callback(data);
            }
        }
    }

    run off(event, callback) {
        if (self.events[event]) {
            let index = self.events[event].indexOf(callback);
            if (index > -1) {
                self.events[event].splice(index, 1);
            }
        }
    }
}

model UserManager inherits EventEmitter {
    __init__() {
        super();
        self.users = [];
    }

    run addUser(user) {
        self.users.push(user);
        self.emit('userAdded', user);
    }

    run removeUser(userId) {
        let index = self.users.findIndex(user => user.id === userId);
        if (index > -1) {
            let user = self.users.splice(index, 1)[0];
            self.emit('userRemoved', user);
        }
    }
}

// Usage
let userManager = fresh UserManager();

userManager.on('userAdded', (user) => {
    speak.say(`User added: ${user.name}`);
});

userManager.on('userRemoved', (user) => {
    speak.say(`User removed: ${user.name}`);
});

let user = fresh User("Charlie", "charlie@example.com");
userManager.addUser(user);
userManager.removeUser(user.id);
```

## Encapsulation and Privacy

### Private Fields (Convention)

```javascript
model BankAccount {
    __init__(accountNumber, initialBalance) {
        self._accountNumber = accountNumber;  // Convention: _ means private
        self._balance = initialBalance;
        self._transactions = [];
    }

    run deposit(amount) {
        if (amount > 0) {
            self._balance += amount;
            self._addTransaction('deposit', amount);
            return true;
        }
        return false;
    }

    run withdraw(amount) {
        if (amount > 0 && amount <= self._balance) {
            self._balance -= amount;
            self._addTransaction('withdrawal', amount);
            return true;
        }
        return false;
    }

    run getBalance() {
        return self._balance;
    }

    run getAccountNumber() {
        return self._accountNumber;
    }

    // Private method (convention)
    run _addTransaction(type, amount) {
        self._transactions.push({
            type,
            amount,
            timestamp: new Date(),
            balance: self._balance
        });
    }

    run getTransactionHistory() {
        return [...self._transactions];  // Return copy, not reference
    }
}
```

### Getters and Setters

```javascript
model Temperature {
    __init__(celsius) {
        self._celsius = celsius;
    }

    // Getter
    get celsius() {
        return self._celsius;
    }

    // Setter
    set celsius(value) {
        if (value < -273.15) {
            trigger fresh fail("Temperature cannot be below absolute zero");
        }
        self._celsius = value;
    }

    // Computed getter
    get fahrenheit() {
        return (self._celsius * 9/5) + 32;
    }

    // Computed setter
    set fahrenheit(value) {
        self._celsius = (value - 32) * 5/9;
    }

    // Computed getter
    get kelvin() {
        return self._celsius + 273.15;
    }

    // Computed setter
    set kelvin(value) {
        self._celsius = value - 273.15;
    }
}

// Usage
let temp = fresh Temperature(25);
speak.say(`Celsius: ${temp.celsius}°C`);
speak.say(`Fahrenheit: ${temp.fahrenheit}°F`);
speak.say(`Kelvin: ${temp.kelvin}K`);

temp.fahrenheit = 100;  // Automatically converts to Celsius
speak.say(`New Celsius: ${temp.celsius}°C`);
```

## Testing Classes

### Unit Testing

```javascript
// calculator.test.ns
use { Calculator } from './calculator.ns';

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = fresh Calculator();
    });

    test('should start with result 0', () => {
        expect(calculator.getResult()).toBe(0);
    });

    test('should add numbers correctly', () => {
        calculator.add(5);
        expect(calculator.getResult()).toBe(5);

        calculator.add(3);
        expect(calculator.getResult()).toBe(8);
    });

    test('should subtract numbers correctly', () => {
        calculator.add(10);
        calculator.subtract(3);
        expect(calculator.getResult()).toBe(7);
    });

    test('should support method chaining', () => {
        let result = calculator.add(5).subtract(2).getResult();
        expect(result).toBe(3);
    });
});
```

### Mocking and Stubbing

```javascript
// user-service.test.ns
use { UserService } from './user-service.ns';

// Mock the User class
jest.mock('./user.ns', () => ({
    User: jest.fn().mockImplementation((name, email) => ({
        name,
        email,
        save: jest.fn().mockResolvedValue({ id: 1, name, email })
    }))
}));

use { User } from './user.ns';

describe('UserService', () => {
    let userService;

    beforeEach(() => {
        userService = fresh UserService();
        jest.clearAllMocks();
    });

    test('should create user successfully', async () => {
        const result = await userService.createUser('Alice', 'alice@example.com');

        expect(User).toHaveBeenCalledWith('Alice', 'alice@example.com');
        expect(result.name).toBe('Alice');
        expect(result.email).toBe('alice@example.com');
    });
});
```

## Performance and Best Practices

### 1. **Use Composition Over Inheritance**

```javascript
// ❌ Bad: Deep inheritance hierarchy
model Animal { /* ... */ }
model Mammal inherits Animal { /* ... */ }
model Dog inherits Mammal { /* ... */ }
model GoldenRetriever inherits Dog { /* ... */ }

// ✅ Good: Composition
model Dog {
    __init__(name, breed) {
        self.name = name;
        self.breed = breed;
        self.behavior = fresh DogBehavior();
        self.health = fresh HealthTracker();
    }
}

model DogBehavior {
    run bark() { return "Woof!"; }
    run fetch() { return "Fetching ball"; }
}

model HealthTracker {
    __init__() {
        self.vaccinations = [];
        self.lastCheckup = null;
    }
}
```

### 2. **Implement Proper Cleanup**

```javascript
model ResourceManager {
    __init__() {
        self.resources = new Set();
    }

    run addResource(resource) {
        self.resources.add(resource);
    }

    run removeResource(resource) {
        if (self.resources.has(resource)) {
            resource.cleanup();  // Ensure cleanup
            self.resources.delete(resource);
        }
    }

    run cleanup() {
        for (let resource of self.resources) {
            resource.cleanup();
        }
        self.resources.clear();
    }
}
```

### 3. **Use Static Methods Appropriately**

```javascript
model MathUtils {
    // Static method - doesn't need instance
    static run add(a, b) {
        return a + b;
    }

    static run multiply(a, b) {
        return a * b;
    }

    // Instance method - needs instance state
    run calculateWithHistory(a, b, operation) {
        let result = operation(a, b);
        self.history.push({ a, b, operation: operation.name, result });
        return result;
    }
}

// Usage
let sum = MathUtils.add(5, 3);  // Static method
let utils = fresh MathUtils();
let result = utils.calculateWithHistory(10, 2, MathUtils.multiply);
```

### 4. **Implement Proper Error Handling**

```javascript
model DataValidator {
    __init__() {
        self.rules = new Map();
    }

    run addRule(field, validator) {
        self.rules.set(field, validator);
    }

    run validate(data) {
        let errors = [];

        for (let [field, validator] of self.rules) {
            test {
                validator(data[field]);
            } grab (error) {
                errors.push({
                    field,
                    message: error.message,
                    value: data[field]
                });
            }
        }

        if (errors.length > 0) {
            trigger fresh ValidationError("Validation failed", errors);
        }

        return true;
    }
}

model ValidationError inherits fail {
    __init__(message, errors) {
        super(message);
        self.errors = errors;
    }
}
```

## Related Topics

- **[Basic Concepts](../guide/basic-concepts.md)** - Foundation of NullScript
- **[Modules](../guide/modules.md)** - Organizing classes into modules
- **[Best Practices](../guide/best-practices.md)** - Object-oriented best practices
- **[Testing](../guide/best-practices.md#testing)** - Testing classes and objects

---

**Next Steps**: Practice class patterns in the [Playground](../playground.md) or explore [Advanced Examples](../examples/advanced.md) for complex object-oriented scenarios.
