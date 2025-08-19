---
layout: home
title: "NullScript - JavaScript with Attitude"
titleTemplate: false

hero:
  name: "NullScript"
  text: "JavaScript with Attitude"
  tagline: "A fun parody programming language that transpiles to JavaScript"
  image:
    src: "/logo.png"
    alt: NullScript Logo
    width: 512
    height: 512
  actions:
    - theme: brand
      text: Get Started
      link: /guide/introduction
    - theme: alt
      text: Try Playground
      link: /playground
    - theme: alt
      text: VS Code Extension
      link: https://marketplace.visualstudio.com/items?itemName=nullscript-lang.nullscript-intelligence

features:
  - icon: 🎪
    title: Fun keyword aliases
    details: Use speak instead of console, run instead of function, and more creative alternatives
  - icon: 🔧
    title: Pure JavaScript output
    details: No type annotations, just clean JS that works everywhere
  - icon: 📁
    title: .ns file extension
    details: Give your files that special NullScript feeling
  - icon: ⚡
    title: Zero runtime overhead
    details: Compiles directly to JavaScript with same performance
  - icon: 🛠️
    title: CLI tooling
    details: Build and run commands for seamless development
  - icon: 🤝
    title: JavaScript compatible
    details: Import/export with JavaScript and Node.js projects
  - icon: 🎯
    title: VS Code Extension
    details: Smart auto-completion with design patterns, contextual hover docs, import assistance, and beautiful syntax highlighting
  - icon: 🔍
    title: IDE Support
    details: Language server protocol support for multiple editors and development tools
  - icon: 🎨
    title: Syntax Highlighting
    details: Beautiful syntax highlighting optimized for NullScript
---

## Quick Example

```javascript
run greet(name) {
  return `Hello, ${name}! Welcome to NullScript! 🎭`;
}

fixed message = greet("Developer");
speak.say(message);
```

Compiles to clean JavaScript:

```javascript
function greet(name) {
  return `Hello, ${name}! Welcome to NullScript! 🎭`;
}

const message = greet("Developer");
console.log(message);
```

## VS Code Extension Available!

Get the full NullScript development experience with our **NullScript Intelligence** extension:

- **Smart auto-completion** with design patterns and boilerplate code
- **Enhanced hover documentation** with contextual hints and best practices
- **Intelligent import assistance** for modules and packages
- **Beautiful syntax highlighting** optimized for NullScript
- **Performance insights** and usage statistics
- **Configurable settings** to customize your experience

[**Install from VS Code Marketplace →**](https://marketplace.visualstudio.com/items?itemName=nullscript-lang.nullscript-intelligence)

## Why NullScript?

NullScript makes JavaScript development more enjoyable by providing:

- **Familiar syntax** with a fun twist
- **No learning curve** - it's still JavaScript underneath
- **Zero configuration** - just install and start coding
- **Full compatibility** with existing JavaScript ecosystems
- **Professional IDE support** with VS Code extension

## Community & Resources

Join our growing community and access comprehensive resources:

- **[Documentation](./guide/introduction.md)** - Complete guides and examples
- **[FAQ](./community/faq.md)** - Common questions and answers
- **[Contributing](./community/contribute.md)** - Help improve documentation
- **[Playground](./playground.md)** - Interactive code examples
- **[Examples](./examples/basic.md)** - Practical code samples

---

_"NullScript: Because programming should be fun, even when it's serious."_ 🎭
