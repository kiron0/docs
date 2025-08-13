# Installation

Get started with NullScript in seconds! 🚀

## Prerequisites

- **Node.js** 16 or higher
- **npm** or **yarn** package manager

## Global Installation

Install NullScript globally to use the `nsc` command anywhere:

```bash
npm install -g nullscript
```

Verify the installation:

```bash
nsc --version
```

## Project Installation

For project-specific installations:

```bash
# npm
npm install nullscript --save-dev

# yarn
yarn add nullscript --dev

# pnpm
pnpm add -D nullscript
```

## Building from Source

If you want to build from source or contribute to NullScript:

### Prerequisites
- **Rust** 1.70 or higher
- **Cargo** (comes with Rust)

### Steps

1. **Clone the repository**:
```bash
git clone https://github.com/nullscript-lang/nullscript.git
cd nullscript
```

2. **Install dependencies**:
```bash
npm install
```

3. **Build the Rust CLI**:
```bash
npm run cli:build
```

4. **Link for global usage** (optional):
```bash
npm link packages/nullscript-cli
```

## Verify Installation

Create a test file `hello.ns`:

```javascript
fixed greeting = "Hello, NullScript! 🎭";
speak.say(greeting);
```

Run it:

```bash
nsc run hello.ns
```

You should see:
```
Hello, NullScript! 🎭
```

## IDE Support

### VS Code

While there's no official extension yet, you can:

1. Associate `.ns` files with JavaScript syntax highlighting
2. Add to your VS Code settings:

```json
{
  "files.associations": {
    "*.ns": "javascript"
  }
}
```

### Other Editors

Most editors that support JavaScript syntax highlighting will work well with `.ns` files by associating the file extension with JavaScript mode.

## Next Steps

- [Write your first program →](/guide/getting-started.md)
- [Learn the basic concepts →](/guide/basic-concepts.md)
- [Learn the best practices →](/guide/best-practices.md)
- [Explore the language reference →](/reference/keywords.md)
