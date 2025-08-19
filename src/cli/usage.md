# CLI Usage

The NullScript CLI (`nsc`) provides powerful tools for developing with NullScript, from building and running files to advanced project management and analysis.

## Installation

```bash
npm install -g nullscript
```

## Command Overview

The NullScript CLI is organized into logical command groups:

### 📦 BUILD & RUN

- `nsc build` - Transpile NullScript files to JavaScript
- `nsc run` - Execute NullScript files directly
- `nsc convert` - Convert JavaScript files to NullScript

### 🔧 PROJECT MANAGEMENT

- `nsc init` - Initialize new NullScript projects
- `nsc config` - Manage configuration files

### 💻 DEVELOPMENT

- `nsc dev` - Development mode with file watching
- `nsc complete` - Get code completion suggestions
- `nsc debug` - Debug NullScript files with breakpoints

### 📊 ANALYSIS & INFO

- `nsc analyze` - Analyze project performance and metrics
- `nsc analytics` - Show project analytics and statistics
- `nsc info` - Display detailed file information

### 🎛️ UTILITIES

- `nsc keywords` - Browse available keywords and mappings
- `nsc system` - Show system information

## Command Reference

### `nsc build`

Transpile NullScript files to JavaScript:

```bash
# Transpile single file
nsc build hello.ns

# Transpile entire directory
nsc build src/

# Specify output directory
nsc build src/ --outDir dist
```

**Features:**

- Recursive directory processing
- Preserves directory structure
- Source map generation
- Error reporting with line numbers

### `nsc run`

Execute NullScript files directly without pre-compilation:

```bash
nsc run hello.ns
```

**Perfect for:**

- Quick testing and prototyping
- Running simple scripts
- Development and debugging
- One-off executions

### `nsc convert`

Convert JavaScript files to NullScript syntax:

```bash
# Convert single file
nsc convert app.js

# Specify output file
nsc convert app.js --output app.ns

# Format the output
nsc convert app.js --format

# Show conversion report
nsc convert app.js --report
```

### `nsc init`

Initialize new NullScript projects:

```bash
# Create new project in current directory
nsc init

# Create project with specific name
nsc init my-project

# Use project template
nsc init my-project --template basic

# Force initialization in non-empty directory
nsc init --force
```

**Available Templates:**

- `basic` - Simple project structure
- `web` - Web application template
- `node` - Node.js application template
- `library` - Library/package template

### `nsc config`

Manage project configuration:

```bash
# Show current configuration
nsc config --show

# Generate default configuration file
nsc config --generate

# Validate configuration file
nsc config --validate
```

### `nsc dev`

Development mode with file watching:

```bash
# Watch current directory
nsc dev

# Watch specific directory
nsc dev src/

# Watch and rebuild on changes
nsc dev src/ --watch

# Execute files when they change
nsc dev src/ --run-on-save
```

### `nsc complete`

Get code completion suggestions (useful for IDE integration):

```bash
# Get completions for specific position
nsc complete src/app.ns --line 10 --column 5

# Output in different formats
nsc complete src/app.ns --line 10 --column 5 --format json
nsc complete src/app.ns --line 10 --column 5 --format text
```

### `nsc debug`

Debug NullScript files with advanced features:

```bash
# Debug with initial breakpoint
nsc debug app.ns --breakpoint 15

# Enable performance profiling
nsc debug app.ns --profile
```

### `nsc analyze`

Analyze project performance and generate reports:

```bash
# Analyze current project
nsc analyze

# Analyze specific directory
nsc analyze src/

# Specify output directory for reports
nsc analyze src/ --output reports/

# Set bundle size limits
nsc analyze src/ --bundle-size-limit 1000000

# Set build time budget
nsc analyze src/ --build-time-budget 5000

# Generate different report formats
nsc analyze src/ --format html
nsc analyze src/ --format json
```

**Analysis Features:**

- Bundle size analysis
- Build time metrics
- Code complexity analysis
- Performance bottleneck detection
- Memory usage profiling

### `nsc analytics`

Show project analytics and development statistics:

```bash
# Show analytics for current project
nsc analytics

# Analyze specific time period
nsc analytics --days 30

# Different output formats
nsc analytics --format text
nsc analytics --format json
```

### `nsc analyze-clean`

Clean up analysis reports:

```bash
# Clean default reports directory
nsc analyze-clean

# Clean specific directory
nsc analyze-clean --reports-dir custom-reports/

# Force removal without confirmation
nsc analyze-clean --force
```

### `nsc info`

Display detailed file and project information:

```bash
# Show basic file info
nsc info hello.ns

# Show detailed information
nsc info src/ --detailed
```

**Information Displayed:**

- File sizes and line counts
- Modification timestamps
- Project structure analysis
- NullScript file statistics

### `nsc keywords`

Browse available keywords and their mappings:

```bash
# Show all keywords
nsc keywords

# Filter by category
nsc keywords --category "Control Flow"
nsc keywords --category "Functions & Methods"
nsc keywords --category "Console Methods"
```

**Available Categories:**

- `Control Flow` - Conditionals, loops, and flow control
- `Variables & Declarations` - Variable declaration keywords
- `Functions & Methods` - Function-related keywords
- `Operators` - Comparison and logical operators
- `Types & Classes` - Object-oriented programming
- `Console Methods` - Console output methods
- `Global Objects` - Built-in JavaScript objects
- `Global Functions` - Global utility functions
- `Timing Functions` - setTimeout, setInterval, etc.
- `Boolean Values` - true, false, null, undefined
- `Modules & Imports` - Import/export statements
- `Error Handling` - try, catch, finally
- `Object-Oriented` - Classes, inheritance, objects
- `Async/Await` - Asynchronous programming
- `Utility` - Utility keywords and operators

### `nsc system`

Show system information and dependencies:

```bash
nsc system --info
```

**System Check:**

- Node.js availability and version
- NullScript CLI version
- System compatibility

## Global Options

| Option      | Short | Description           |
| ----------- | ----- | --------------------- |
| `--help`    | `-h`  | Show help information |
| `--version` | `-v`  | Show version number   |

## Development Workflows

### Quick Start Workflow

```bash
# Create a new project
nsc init my-app
cd my-app

# Run the generated example
nsc run src/main.ns

# Start development mode
nsc dev src/ --watch
```

### Building for Production

```bash
# Analyze your project first
nsc analyze src/

# Build optimized version
nsc build src/ --outDir dist

# Check build output
nsc info dist/ --detailed
```

### Converting Existing JavaScript

```bash
# Convert JavaScript to NullScript
nsc convert app.js --output app.ns --format

# Review conversion report
nsc convert app.js --report

# Test the converted file
nsc run app.ns
```

### Debugging Workflow

```bash
# Debug with breakpoint
nsc debug src/app.ns --breakpoint 25

# Profile performance
nsc debug src/app.ns --profile

# Complete code while editing
nsc complete src/app.ns --line 10 --column 5
```

## Advanced Features

### Configuration Files

Create `nullscript.config.json` for project settings:

```bash
# Generate default configuration
nsc config --generate

# Validate existing configuration
nsc config --validate

# View current settings
nsc config --show
```

### Project Templates

Available project templates:

```bash
# Basic project structure
nsc init my-project --template basic

# Web application with HTML/CSS
nsc init my-webapp --template web

# Node.js backend application
nsc init my-api --template node

# Reusable library/package
nsc init my-lib --template library
```

### Performance Analysis

Generate detailed performance reports:

```bash
# Full analysis with HTML report
nsc analyze src/ --format html --output reports/

# Set performance budgets
nsc analyze src/ --bundle-size-limit 500000 --build-time-budget 3000

# View project analytics
nsc analytics --days 7 --format json
```

## Tips and Best Practices

### Development Tips

1. **Use `nsc dev --watch`** for real-time development
2. **Set up project templates** for consistent project structure
3. **Use `nsc analyze`** regularly to catch performance issues early
4. **Leverage `nsc complete`** for IDE integration
5. **Keep `nullscript.config.json`** in version control

### Performance Tips

1. **Monitor bundle sizes** with `nsc analyze --bundle-size-limit`
2. **Profile builds** using `nsc debug --profile`
3. **Clean up reports** with `nsc analyze-clean` periodically
4. **Use analytics** to track development patterns

### Project Organization

```
my-nullscript-project/
├── src/                 # Source files
│   ├── main.ns         # Entry point
│   ├── utils/          # Utility modules
│   └── components/     # Reusable components
├── dist/               # Built output
├── reports/            # Analysis reports
├── nullscript.config.json
└── package.json
```

## Troubleshooting

### Common Issues

**Installation Issues:**

```bash
# Clear npm cache and reinstall
npm cache clean --force
npm install -g nullscript

# Check installation
nsc --version
nsc system --info
```

**Build Errors:**

```bash
# Get detailed error information
nsc build src/ --verbose

# Check file syntax
nsc keywords --category "Error Handling"

# Validate project structure
nsc info src/ --detailed
```

**Performance Issues:**

```bash
# Analyze bottlenecks
nsc analyze src/ --format html

# Clean up old reports
nsc analyze-clean --force

# Check system resources
nsc system --info
```

**Development Workflow Issues:**

```bash
# Reset configuration
nsc config --generate --force

# Check file watching
nsc dev src/ --watch --verbose

# Verify file permissions
nsc info src/ --detailed
```

### Getting Help

- **CLI Help**: `nsc --help` or `nsc <command> --help`
- **Documentation**: [NullScript Guide](/guide/introduction)
- **Keywords Reference**: `nsc keywords` or [Keywords Reference](/reference/keywords)
- **System Info**: `nsc system --info`
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/nullscript-lang/nullscript/issues)

## Integration

### IDE Integration

The CLI provides language server features for IDE support:

```bash
# Get code completions (used by VS Code extension)
nsc complete file.ns --line 10 --column 5 --format json

# Debug integration
nsc debug file.ns --breakpoint 15
```

### CI/CD Integration

Example GitHub Actions workflow:

```yaml
name: Build NullScript
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm install -g nullscript
      - run: nsc build src/
      - run: nsc analyze src/ --bundle-size-limit 1000000
```

### Package.json Scripts

Add common commands to your `package.json`:

```json
{
  "scripts": {
    "build": "nsc build src/ --outDir dist",
    "dev": "nsc dev src/ --watch",
    "analyze": "nsc analyze src/ --format html",
    "debug": "nsc debug src/main.ns",
    "convert": "nsc convert legacy.js --output legacy.ns"
  }
}
```
