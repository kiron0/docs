# Frequently Asked Questions

> **Common questions and answers about NullScript**

This FAQ addresses the most frequently asked questions about NullScript, from basic syntax to advanced usage patterns.

## Getting Started

### What is NullScript?

NullScript is a JavaScript superset that replaces traditional programming keywords with more expressive and intuitive alternatives. It's designed to make code more readable and enjoyable to write while maintaining full JavaScript compatibility.

### Why should I use NullScript?

- **Better Readability**: Keywords like `run` instead of `function` make code more expressive
- **JavaScript Compatible**: All NullScript code compiles to standard JavaScript
- **No Runtime Overhead**: Zero performance impact in production
- **Easy Migration**: Gradually adopt NullScript in existing JavaScript projects
- **Fun Programming**: More enjoyable coding experience

### How do I get started with NullScript?

1. **Install the CLI**: `npm install -g nullscript-cli`
2. **Create a file**: Use `.ns` extension (e.g., `hello.ns`)
3. **Write code**: Use NullScript keywords like `run`, `whatever`, `speak.say`
4. **Compile**: Run `nsc build hello.ns` to generate JavaScript
5. **Run**: Execute the generated JavaScript with Node.js or in the browser

### What file extension should I use?

Use the `.ns` extension for NullScript files. This helps editors and tools identify NullScript code and provides proper syntax highlighting.

## Syntax and Keywords

### What are the main keyword mappings?

| NullScript     | JavaScript      | Example                        |
| -------------- | --------------- | ------------------------------ |
| `run`          | `function`      | `run greet() { ... }`          |
| `whatever`     | `if`            | `whatever (condition) { ... }` |
| `speak.say`    | `console.log`   | `speak.say("Hello")`           |
| `speak.scream` | `console.error` | `speak.scream("Error")`        |
| `model`        | `class`         | `model User { ... }`           |
| `fresh`        | `new`           | `fresh User()`                 |
| `later`        | `async`         | `run later fetch() { ... }`    |
| `hold`         | `await`         | `let data = hold fetch()`      |

### Can I mix NullScript and JavaScript?

Yes! NullScript is designed for gradual adoption. You can:

- Use NullScript in `.ns` files
- Use JavaScript in `.js` files
- Import between both file types
- Gradually convert existing JavaScript to NullScript

### What about existing JavaScript libraries?

NullScript works with all existing JavaScript libraries and frameworks:

- React, Vue, Angular
- Express, Koa, Fastify
- Lodash, Moment, Axios
- Any npm package

### Are there any reserved words I should avoid?

Avoid using NullScript keywords as variable names:

```javascript
// ❌ Don't use keywords as variables
let run = "function"; // Conflicts with 'run' keyword
let whatever = true; // Conflicts with 'whatever' keyword

// ✅ Use descriptive names instead
let functionName = "function";
let condition = true;
```

## Development and Tooling

### Which editors support NullScript?

- **VS Code**: Official extension with syntax highlighting, autocomplete, and error detection
- **WebStorm/IntelliJ**: Plugin support
- **Vim/Neovim**: Syntax highlighting plugins
- **Sublime Text**: Package support

### How do I set up VS Code for NullScript?

1. Install the "NullScript Intelligence" extension from the VS Code marketplace
2. Open a `.ns` file
3. Enjoy syntax highlighting, autocomplete, and error detection
4. Use `Ctrl+Shift+P` → "NullScript: Compile File" to build

### Can I use TypeScript with NullScript?

Yes! NullScript can work alongside TypeScript:

1. Write NullScript code in `.ns` files
2. Compile to JavaScript with `nsc`
3. Use TypeScript to type-check the generated JavaScript
4. Or use JSDoc comments in NullScript for type hints

### How do I debug NullScript code?

1. **Source Maps**: Generate source maps with `nsc build --source-maps`
2. **VS Code Debugging**: Set breakpoints in `.ns` files
3. **Console Output**: Use `speak.say()` and `speak.scream()` for debugging
4. **Error Stack Traces**: Errors point to the original NullScript code

## Advanced Features

### How do I handle async operations?

NullScript provides intuitive async patterns:

```javascript
run later fetchUserData(id) {
    let response = hold pull(`/api/users/${id}`);
    let userData = hold response.json();
    return userData;
}

// Usage
run later main() {
    let user = hold fetchUserData(123);
    speak.say("User:", user.name);
}
```

### What about error handling?

Use `test` and `grab` for error handling:

```javascript
test {
    let data = hold fetchData();
    speak.say("Success:", data);
} grab (error) {
    speak.scream("Error occurred:", error.message);
}
```

### How do I work with classes?

NullScript classes use `model`, `self`, and `__init__`:

```javascript
model User {
    __init__(name, email) {
        self.name = name;
        self.email = email;
    }

    run greet() {
        return `Hello, I'm ${self.name}`;
    }
}

let user = fresh User("Alice", "alice@example.com");
speak.say(user.greet());
```

### Can I use modern JavaScript features?

Yes! NullScript supports all modern JavaScript features:

- Arrow functions
- Destructuring
- Spread/rest operators
- Template literals
- Modules (ES6)
- Async/await
- Classes
- And more

## Migration and Compatibility

### How do I migrate from JavaScript to NullScript?

1. **Start Small**: Convert one file at a time
2. **Rename Files**: Change `.js` to `.ns`
3. **Update Keywords**: Replace `function` with `run`, `if` with `whatever`, etc.
4. **Test Thoroughly**: Ensure functionality remains the same
5. **Update Imports**: Change import paths to `.ns` files

### Will my existing code break?

No! NullScript is designed for seamless migration:

- All JavaScript code is valid NullScript
- You can mix both in the same project
- Gradual adoption is encouraged
- No breaking changes to existing functionality

### What about build tools and bundlers?

NullScript works with all major build tools:

- **Webpack**: Use `nullscript-loader`
- **Vite**: Use `vite-plugin-nullscript`
- **Rollup**: Use `@rollup/plugin-nullscript`
- **Parcel**: Built-in support
- **ESBuild**: Use `esbuild-plugin-nullscript`

### Can I use NullScript in the browser?

Yes! You have several options:

1. **Compile First**: Use `nsc` to compile to JavaScript, then load the JS
2. **Runtime Transpilation**: Use the browser runtime for development
3. **CDN**: Load from CDN for quick testing

## Testing and Quality

### How do I test NullScript code?

Test NullScript code the same way you test JavaScript:

- **Jest**: Works out of the box
- **Mocha**: No configuration needed
- **Vitest**: Full compatibility
- **Cypress**: Test compiled JavaScript
- **Playwright**: Test compiled JavaScript

### Can I use testing frameworks with NullScript?

Absolutely! All testing frameworks work seamlessly:

```javascript
// user.test.ns
use { User } from './user.ns';

describe('User', () => {
    test('should create user with name and email', () => {
        let user = fresh User("Alice", "alice@example.com");
        expect(user.name).toBe("Alice");
        expect(user.email).toBe("alice@example.com");
    });
});
```

### How do I handle debugging in tests?

Use NullScript's debugging features in tests:

```javascript
test('should handle errors gracefully', () => {
    test {
        throwError();
    } grab (error) {
        expect(error.message).toBe("Expected error");
    }
});
```

## Performance and Production

### Is there a performance impact?

**No performance impact in production!** NullScript:

- Compiles to standard JavaScript
- No runtime overhead
- Same performance as handwritten JavaScript
- Optimized by modern JavaScript engines

### How do I optimize NullScript code?

1. **Tree Shaking**: Use ES6 modules for better bundling
2. **Code Splitting**: Split code into logical chunks
3. **Lazy Loading**: Load modules on demand
4. **Minification**: Use standard JavaScript minifiers

### Can I use NullScript in production?

Absolutely! NullScript is production-ready:

- Stable and reliable
- Used in production applications
- Full JavaScript compatibility
- No runtime dependencies

## Community and Support

### Where can I get help?

- **Documentation**: [docs.nullscript.dev](https://docs.nullscript.dev)
- **GitHub**: [github.com/nullscript-lang](https://github.com/nullscript-lang)
- **Discord**: Join our community server
- **Issues**: Report bugs and request features on GitHub
- **Discussions**: Ask questions in GitHub Discussions

### How can I contribute?

We welcome contributions! Here are ways to help:

- **Code**: Submit pull requests
- **Documentation**: Improve guides and examples
- **Testing**: Test features and report bugs
- **Examples**: Create sample applications
- **Feedback**: Share your experience and suggestions

### Is NullScript open source?

Yes! NullScript is completely open source:

- MIT License
- Public repository on GitHub
- Community-driven development
- Transparent development process

### What's the roadmap for NullScript?

Our development priorities include:

- Enhanced IDE support
- More language features
- Better tooling integration
- Performance optimizations
- Community growth

## Troubleshooting

### Common compilation errors

**"Unexpected token" errors:**

- Check that you're using `.ns` file extension
- Ensure proper NullScript syntax
- Verify keyword usage

**"Module not found" errors:**

- Check file paths and extensions
- Ensure modules are properly exported
- Verify import/export syntax

**"Cannot read property" errors:**

- Check object initialization
- Verify method calls
- Ensure proper error handling

### Debugging tips

1. **Use `speak.say()`**: Add logging throughout your code
2. **Check compiled output**: Look at the generated JavaScript
3. **Verify syntax**: Use VS Code extension for real-time feedback
4. **Test incrementally**: Build and test small sections

### Performance issues

1. **Check bundle size**: Ensure tree shaking is working
2. **Profile code**: Use browser dev tools
3. **Optimize imports**: Only import what you need
4. **Use source maps**: For accurate debugging

## Learning Resources

### Where should I start?

1. **[Getting Started](../guide/getting-started.md)** - Basic setup and first steps
2. **[Basic Concepts](../guide/basic-concepts.md)** - Core language concepts
3. **[Playground](../playground.md)** - Interactive examples
4. **[Examples](../examples/basic.md)** - Sample code and patterns

### Recommended learning path

1. **Week 1**: Basic syntax and keywords
2. **Week 2**: Functions and control flow
3. **Week 3**: Classes and objects
4. **Week 4**: Async patterns and error handling
5. **Week 5**: Modules and advanced features
6. **Week 6**: Real-world projects and best practices

---

**Still have questions?** Join our [Discord community](https://discord.gg/W33KGnsF) or ask in [GitHub Discussions](https://github.com/nullscript-lang/nullscript/discussions)!
