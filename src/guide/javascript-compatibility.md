# JavaScript Compatibility

> **100% JavaScript Compatible - Zero Breaking Changes**

NullScript is designed to be a **drop-in replacement** for JavaScript. Every valid JavaScript program is also a valid NullScript program, and every NullScript program compiles to clean, standard JavaScript.

## 🔒 Compatibility Guarantee

### **What This Means:**
- ✅ **All JavaScript code works unchanged** in NullScript
- ✅ **All JavaScript libraries and frameworks** work without modification
- ✅ **All JavaScript APIs and features** are fully supported
- ✅ **All JavaScript tooling** (ESLint, Prettier, etc.) works
- ✅ **All JavaScript runtimes** (Node.js, browsers) are supported

### **What This Guarantees:**
- **Zero breaking changes** when switching to NullScript
- **Gradual adoption** - convert files one at a time
- **Full ecosystem access** - use any npm package
- **Future-proof** - new JavaScript features automatically work

## 🎯 How Compatibility Works

### **1. Source-Level Compatibility**

NullScript accepts all JavaScript syntax:

```javascript
// This is valid JavaScript AND valid NullScript
function calculateTotal(items) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  const tax = total * 0.08;
  return total + tax;
}

// Arrow functions work exactly the same
const processItems = (items) => items.map(item => ({ ...item, processed: true }));

// Modern JavaScript features work
const { name, price } = item;
const items = [...oldItems, newItem];
```

### **2. Compilation Process**

NullScript compiles to clean, readable JavaScript:

```javascript
// Input: hello.ns
run greet(name) {
  fixed message = `Hello, ${name}!`;
  speak.say(message);
  return message;
}

// Output: hello.js (after compilation)
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}
```

### **3. Runtime Compatibility**

The compiled JavaScript runs identically to the original:

```bash
# Run NullScript directly
nsc run hello.ns

# Or compile and run the JavaScript
nsc build hello.ns
node hello.js
```

## 🧪 Compatibility Testing

### **Test Suite Coverage**

NullScript maintains a comprehensive test suite that verifies:

- **ECMAScript 2023** - All current JavaScript features
- **Legacy JavaScript** - ES5, ES6, ES2017+ compatibility
- **Edge Cases** - Complex syntax and patterns
- **Real-world Code** - Popular libraries and frameworks

### **Framework Compatibility**

Tested and verified with:

```javascript
// React - Full compatibility
import React, { useState, useEffect } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
};
```

```javascript
// Express.js - Full compatibility
const express = require('express');
const app = express();

app.get('/api/users', (req, res) => {
  const users = getUsers();
  res.json(users);
});

app.listen(3000, () => {
  console.log('Server running');
});
```

```javascript
// Vue.js - Full compatibility
import { createApp, ref, computed } from 'vue';

const app = createApp({
  setup() {
    const count = ref(0);
    const doubleCount = computed(() => count.value * 2);

    const increment = () => count.value++;

    return { count, doubleCount, increment };
  }
});
```

## 🔧 Build Tool Integration

### **Webpack**

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ns$/,
        use: 'nullscript-loader',
        exclude: /node_modules/
      }
    ]
  }
};
```

### **Vite**

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import nullscript from 'vite-plugin-nullscript';

export default defineConfig({
  plugins: [nullscript()]
});
```

### **Rollup**

```javascript
// rollup.config.js
import nullscript from '@rollup/plugin-nullscript';

export default {
  plugins: [nullscript()]
};
```

## 🚨 What Doesn't Change

### **Runtime Behavior**

- **Performance** - Identical to JavaScript
- **Memory usage** - No overhead
- **Execution order** - Same as JavaScript
- **Error handling** - Same stack traces
- **Debugging** - Same debugging experience

### **API Compatibility**

- **DOM APIs** - All browser APIs work unchanged
- **Node.js APIs** - All Node.js modules work
- **Third-party libraries** - All npm packages work
- **Async operations** - Same Promise, async/await behavior

### **Tooling Support**

- **ESLint** - Same linting rules apply
- **Prettier** - Same formatting
- **TypeScript** - Can add types to NullScript
- **Jest/Vitest** - Same testing experience

## 🔄 Migration Scenarios

### **Scenario 1: New Project**

Start with NullScript from day one:

```bash
# Create new project
mkdir my-nullscript-app
cd my-nullscript-app
npm init -y

# Install NullScript
npm install --save-dev nullscript

# Create your first file
echo 'speak.say("Hello, NullScript!");' > src/main.ns

# Run it
nsc run src/main.ns
```

### **Scenario 2: Existing JavaScript Project**

Gradually introduce NullScript:

```bash
# 1. Install NullScript
npm install --save-dev nullscript

# 2. Convert one file at a time
nsc build src/utils.js --outDir dist/

# 3. Update imports gradually
# Before: import { format } from './utils.js';
# After:  import { format } from './utils.ns';

# 4. Test thoroughly
npm test
```

### **Scenario 3: Mixed Codebase**

Run both JavaScript and NullScript together:

```javascript
// app.js (JavaScript)
import { formatDate } from './utils.ns';  // NullScript module
import { validate } from './validators.js'; // JavaScript module

const result = formatDate(new Date());
console.log(validate(result));
```

## 🧪 Testing Compatibility

### **Automated Testing**

```bash
# Test NullScript compilation
nsc build src/ --outDir dist/

# Run your existing test suite
npm test

# Verify output matches expectations
diff src/ dist/ --exclude='*.js'
```

### **Manual Verification**

1. **Compile and compare**: Check that output matches expectations
2. **Runtime behavior**: Ensure same results in both versions
3. **Performance testing**: Verify no performance regression
4. **Browser testing**: Test in all target browsers

## 🎯 Best Practices for Compatibility

### **1. Gradual Adoption**

```javascript
// Start with simple utilities
run formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
}

// Keep complex logic in JavaScript initially
function complexBusinessLogic(data) {
  // ... complex code ...
}
```

### **2. Consistent Naming**

```javascript
// Use consistent file extensions
// .js for JavaScript files
// .ns for NullScript files

// Clear import paths
use { formatDate } from './utils.ns';
use { validate } from './validators.js';
```

### **3. Testing Strategy**

```javascript
// Test both versions
describe('Date formatting', () => {
  test('JavaScript version', () => {
    const result = formatDateJS(new Date('2023-01-01'));
    expect(result).toBe('January 1, 2023');
  });

  test('NullScript version', () => {
    const result = formatDateNS(new Date('2023-01-01'));
    expect(result).toBe('January 1, 2023');
  });
});
```

## 🚀 Advanced Compatibility Features

### **Framework Compatibility**

NullScript works with popular JavaScript frameworks:

```javascript
// React compatibility
use React from 'react';

run Greeting({ name }) {
  return React.createElement('div', { className: 'greeting' },
    React.createElement('h1', null, 'Hello, ', name, '!'),
    React.createElement('p', null, 'Welcome to NullScript')
  );
}

// Express.js compatibility
use express from 'express';
fixed app = express();

app.get('/', (req, res) => {
  res.send('Hello from NullScript!');
});
```

### **Module Resolution**

```javascript
// Supports all module formats
use React from 'react';                    // ES modules
const express = require('express');        // CommonJS
import { useState } from 'react';          // ES modules
module.exports = { helper };               // CommonJS
```

## 🆘 Troubleshooting Compatibility Issues

### **Common Issues and Solutions**

#### Issue 1: Build Tool Not Recognizing .ns Files

**Solution**: Add NullScript loader/plugin to your build configuration

#### Issue 2: Import/Export Mismatches

**Solution**: Ensure consistent use of `use`/`share` in NullScript files

#### Issue 3: Syntax Errors

**Solution**: Check that all NullScript keywords are properly mapped

#### Issue 4: Runtime Errors

**Solution**: Verify compiled JavaScript output matches expectations

## 📚 Resources

- **[Keywords Reference](../reference/keywords.md)** - Complete syntax mapping
- **[Migration Guide](./migration.md)** - Step-by-step migration process
- **[Examples](../examples/basic.md)** - Real-world compatibility examples
- **[Playground](../playground.md)** - Test compatibility online

## 🎉 Conclusion

NullScript's 100% JavaScript compatibility means:

- **Zero risk** when adopting
- **Full ecosystem access**
- **Gradual migration** possible
- **Future-proof** development

Your JavaScript knowledge and experience transfer directly to NullScript. Start small, test thoroughly, and enjoy the enhanced readability that NullScript brings to your codebase.

---

**Ready to experience JavaScript compatibility?** 🚀

[Start Migration](./migration.md) | [View Keywords](../reference/keywords.md) | [Try Examples](../examples/basic.md)
