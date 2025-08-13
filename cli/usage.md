# CLI Usage

The NullScript CLI (`nsc`) provides powerful tools for developing with NullScript.

## Installation

```bash
npm install -g nullscript
```

## Basic Commands

### `nsc run`

Execute a NullScript file directly without compilation:

```bash
nsc run hello.ns
```

This is perfect for:

- Quick testing and prototyping
- Running simple scripts
- Development and debugging

### `nsc build`

Compile NullScript files to JavaScript:

```bash
# Single file
nsc build hello.ns

# Directory (recursive)
nsc build src/

# With output directory
nsc build src/ --outDir dist
```

### `nsc keywords`

Display keyword mappings:

```bash
# Show all keywords
nsc keywords

# Filter by category
nsc keywords --category control-flow
nsc keywords --category functions
nsc keywords --category console
```

Available categories:

- `functions` - Function-related keywords
- `variables` - Variable declaration keywords
- `control-flow` - Conditional and loop keywords
- `classes` - Class and object keywords
- `async` - Async/await keywords
- `console` - Console API keywords
- `operators` - Operator keywords
- `modules` - Import/export keywords

## Command Options

### Global Options

| Option      | Description           |
| ----------- | --------------------- |
| `--help`    | Show help information |
| `--version` | Show version number   |

## Examples

### Development Workflow

```bash
# Start with a simple script
echo 'speak.say("Hello, NullScript!");' > hello.ns
nsc run hello.ns
```

## Tips and Best Practices

1. **Use `nsc run` for development** - It's faster for testing small changes
2. **Organize your files** - Keep `.ns` files in a `src/` directory
3. **Use configuration files** - For consistent builds across team members
4. **Check keywords** - Use `nsc keywords` when unsure about syntax

## Troubleshooting

### Common Issues

**Command not found:**

```bash
# Make sure NullScript is installed globally
npm install -g nullscript

# Or run from node_modules
npx nsc --version
```

**File not found:**

```bash
# Check file path
ls -la hello.ns

# Use absolute path if needed
nsc run /full/path/to/hello.ns
```

**Compilation errors:**

```bash
# Use verbose mode for detailed errors
nsc build hello.ns --verbose
```

For more help, run `nsc --help` or check the [documentation](/reference/keywords.md).
