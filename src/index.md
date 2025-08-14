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

## Why NullScript?

NullScript makes JavaScript development more enjoyable by providing:

- **Familiar syntax** with a fun twist
- **No learning curve** - it's still JavaScript underneath
- **Zero configuration** - just install and start coding
- **Full compatibility** with existing JavaScript ecosystems

---

_"NullScript: Because programming should be fun, even when it's serious."_ 🎭
