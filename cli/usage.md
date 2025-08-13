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

# Watch mode (recompile on changes)
nsc build src/ --outDir dist --watch
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

# Search for specific keywords
nsc keywords --search "speak"
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

### Build Options

| Option | Description | Default |
|--------|-------------|---------|
| `--outDir <dir>` | Output directory | `dist` |
| `--watch` | Watch for file changes | `false` |
| `--verbose` | Verbose output | `false` |
| `--minify` | Minify output | `false` |
| `--sourcemap` | Generate source maps | `false` |

### Global Options

| Option | Description |
|--------|-------------|
| `--help` | Show help information |
| `--version` | Show version number |
| `--quiet` | Suppress output |
| `--config <file>` | Use custom config file |

## Examples

### Development Workflow

```bash
# Start with a simple script
echo 'speak.say("Hello, NullScript!");' > hello.ns
nsc run hello.ns

# Build for production
nsc build hello.ns --outDir dist --minify

# Work on a project
nsc build src/ --outDir dist --watch --sourcemap
```

### Project Structure

```
my-project/
├── src/
│   ├── main.ns
│   ├── utils/
│   │   └── helpers.ns
│   └── components/
│       └── button.ns
├── dist/           # Generated JavaScript
├── package.json
└── nsc.config.json # Optional config file
```

### Configuration File

Create `nsc.config.json` for project-specific settings:

```json
{
  "outDir": "build",
  "sourcemap": true,
  "minify": false,
  "watch": false,
  "include": ["src/**/*.ns"],
  "exclude": ["src/**/*.test.ns"]
}
```

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General error |
| `2` | Invalid arguments |
| `3` | File not found |
| `4` | Compilation error |
| `5` | Runtime error |

## Integration

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "nsc build src/ --outDir dist --watch",
    "build": "nsc build src/ --outDir dist --minify",
    "start": "nsc run src/main.ns",
    "test": "nsc run tests/runner.ns"
  }
}
```

### VS Code Tasks

Create `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Build NullScript",
      "type": "shell",
      "command": "nsc",
      "args": ["build", "src/", "--outDir", "dist"],
      "group": {
        "kind": "build",
        "isDefault": true
      },
      "presentation": {
        "panel": "integrated"
      },
      "problemMatcher": []
    }
  ]
}
```

## Tips and Best Practices

1. **Use `nsc run` for development** - It's faster for testing small changes
2. **Set up watch mode** - Use `--watch` for continuous development
3. **Organize your files** - Keep `.ns` files in a `src/` directory
4. **Use configuration files** - For consistent builds across team members
5. **Check keywords** - Use `nsc keywords` when unsure about syntax

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

For more help, run `nsc --help` or check the [documentation](https://nullscript-lang.github.io/nullscript/).

