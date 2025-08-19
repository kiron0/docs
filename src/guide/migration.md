# Migration Guide

> **From JavaScript to NullScript: A Smooth Transition**

This guide helps you migrate existing JavaScript projects to NullScript, whether you're converting entire projects or introducing NullScript gradually.

## Why Migrate to NullScript?

- **Zero Breaking Changes** - Your existing JavaScript code continues to work
- **Gradual Adoption** - Convert files one at a time
- **Full Compatibility** - All JavaScript libraries and frameworks work unchanged
- **Enhanced Readability** - More expressive keywords make code self-documenting

## Pre-Migration Checklist

Before starting your migration:

- [ ] Ensure your project has a build process (Webpack, Vite, etc.)
- [ ] Have tests in place to verify functionality
- [ ] Backup your original JavaScript files
- [ ] Install NullScript CLI: `npm install -g nullscript`

## Migration Strategies

### Strategy 1: File-by-File Migration (Recommended)

Convert individual files while keeping the rest in JavaScript:

```bash
# Convert a single file
nsc build src/utils.js --outDir dist/

# Convert multiple files
nsc build src/ --outDir dist/
```

### Strategy 2: Gradual Keyword Replacement

Start by replacing only the most common keywords:

```javascript
// Before (JavaScript)
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

// After (NullScript) - Partial migration
function greet(name) {
  const message = `Hello, ${name}!`;
  speak.say(message); // Only this line changed
  return message;
}
```

### Strategy 3: New Features Only

Use NullScript only for new code while keeping existing code unchanged.

## Step-by-Step Migration Process

### Step 1: Install and Configure

```bash
# Install NullScript
npm install --save-dev nullscript

# Add build script to package.json
{
  "scripts": {
    "build:ns": "nsc build src/ --outDir dist/",
    "dev:ns": "nsc build src/ --outDir dist/ --watch"
  }
}
```

### Step 2: Convert Your First File

Choose a simple utility file to start with:

```javascript
// math.js → math.ns
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

module.exports = { add, multiply };
```

Convert to:

```javascript
// math.ns
run add(a, b) {
  return a + b;
}

run multiply(a, b) {
  return a * b;
}

share { add, multiply };
```

### Step 3: Update Import Statements

```javascript
// Before
const { add, multiply } = require('./math.js');

// After
use { add, multiply } from './math.ns';
```

### Step 4: Test Thoroughly

```bash
# Run your test suite
npm test

# Check the compiled output
cat dist/math.js
```

## Common Migration Patterns

### Function Declarations

```javascript
// JavaScript → NullScript
function calculateTotal(items) { ... }
// ↓
run calculateTotal(items) { ... }

// Arrow functions remain the same
const process = (data) => { ... };
```

### Variable Declarations

```javascript
// JavaScript → NullScript
const MAX_RETRIES = 3;
let currentAttempt = 0;
// ↓
fixed MAX_RETRIES = 3;
let currentAttempt = 0;
```

### Console Methods

```javascript
// JavaScript → NullScript
console.log("Info message");
console.error("Error message");
console.warn("Warning message");
// ↓
speak.say("Info message");
speak.scream("Error message");
speak.whisper("Warning message");
```

### Control Flow

```javascript
// JavaScript → NullScript
if (condition) {
  // do something
} else if (otherCondition) {
  // do something else
} else {
  // default
}
// ↓
whatever (condition) {
  // do something
} otherwise whatever (otherCondition) {
  // do something else
} otherwise {
  // default
}
```

### Boolean Values

```javascript
// JavaScript → NullScript
const isActive = true;
const isHidden = false;
// ↓
fixed isActive = yes;
fixed isHidden = no;
```

## Potential Issues and Solutions

### Issue 1: Module System Differences

**Problem**: NullScript uses `use`/`share` instead of `require`/`module.exports`

**Solution**: Update import/export statements consistently across your project

### Issue 2: Keyword Conflicts

**Problem**: Some keywords might conflict with existing variable names

**Solution**: Use the `nsc keywords` command to see all mappings and plan accordingly

### Issue 3: Build Process Integration

**Problem**: Build tools need to handle `.ns` files

**Solution**: Use NullScript CLI to compile before your main build process

## Testing Your Migration

### Automated Testing

```bash
# Run existing tests
npm test

# Add NullScript-specific tests
npm run test:ns
```

### Manual Verification

1. **Compile and check output**: `nsc build src/ --outDir dist/`
2. **Compare behavior**: Run both original and compiled versions
3. **Check browser compatibility**: Test in different browsers
4. **Verify performance**: Ensure no performance regression

## Migration Examples

### Example 1: Express.js Server

```javascript
// server.js → server.ns
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

Convert to:

```javascript
// server.ns
use express from 'express';
fixed app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  speak.say('Server running on port 3000');
});
```

### Example 2: React Component

```javascript
// Button.js → Button.ns
import React from "react";

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
```

Convert to:

```javascript
// Button.ns
use React from 'react';

fixed Button = ({ children, onClick, disabled = no }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

share default Button;
```

## Post-Migration Checklist

After completing your migration:

- [ ] All tests pass
- [ ] Build process works correctly
- [ ] No runtime errors in production
- [ ] Performance is maintained or improved
- [ ] Team is trained on new syntax
- [ ] Documentation is updated

## Getting Help

If you encounter issues during migration:

1. **Check the [Keywords Reference](../reference/keywords.md)** for complete mappings
2. **Use the [Playground](../playground.md)** to test syntax
3. **Review [Examples](../examples/basic.md)** for common patterns
4. **Join our community** for support

## Next Steps

Now that you've migrated to NullScript:

- Explore [Advanced Examples](../examples/advanced.md)
- Learn [Best Practices](../guide/best-practices.md)
- Check out [IDE Support](../guide/ide-support.md)
- Check out [JavaScript Compatibility](../guide/javascript-compatibility.md)
- Try the [Interactive Playground](../playground.md)
- Explore [Basic Examples](../examples/basic.md)

---

**Ready to start your migration?**

[Install NullScript](../guide/installation.md) | [View Keywords](../reference/keywords.md) | [Try Examples](../examples/basic.md)
