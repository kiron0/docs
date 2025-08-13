# Basic Examples

Here are some basic examples to get you started with NullScript.

## Hello World

```javascript
speak.say("Hello, NullScript World!");
```

## Simple Function

```javascript
run greet(name) {
  return `Hello, ${name}! Welcome to NullScript! 🎭`;
}

fixed message = greet("Developer");
speak.say(message);
```

## Variables and Data Types

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

## Control Flow

```javascript
run checkAge(age) {
  whatever (age >= 18) {
    speak.say("You're an adult!");
  } otherwise whatever (age >= 13) {
    speak.say("You're a teenager!");
  } otherwise {
    speak.say("You're a kid!");
  }
}

checkAge(20);
```

## Loops

```javascript
// For loop
since (let i = 0; i < 5; i++) {
  speak.say(`Count: ${i}`);
}

// For...of loop
fixed fruits = ["apple", "banana", "orange"];
since (fixed fruit part fruits) {
  speak.say(`Fruit: ${fruit}`);
}
```

## Error Handling

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

## Classes

```javascript
model Person {
  __init__(name, age) {
    self.name = name;
    self.age = age;
  }

  run greet() {
    return `Hi, I'm ${self.name} and I'm ${self.age} years old.`;
  }
}

fixed person = fresh Person("Alice", 25);
speak.say(person.greet());
```

## Async Functions

```javascript
run later fetchData(url) {
  let response = hold pull(url);
  return hold response.json();
}

run later main() {
  test {
    let data = hold fetchData("https://api.example.com/data");
    speak.say(`Fetched: ${data.title}`);
  } grab (error) {
    speak.scream(`Failed to fetch: ${error.message}`);
  }
}

main();
```
