# VS Code Extension

The **NullScript Intelligence** extension provides intelligent language support for NullScript in Visual Studio Code, featuring smart auto-completion, contextual hover documentation, import assistance, and beautiful syntax highlighting.

**Current Version**: 0.1.4

## Installation

### From VS Code Marketplace

1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "NullScript Intelligence"
4. Click **Install** or [**Install from Marketplace**](https://marketplace.visualstudio.com/items?itemName=nullscript-lang.nullscript-intelligence)

## Features

### 🎯 Intelligent Auto-Completion

The extension provides smart suggestions for NullScript keywords across multiple categories, plus design pattern snippets:

- **Control Flow**: `whatever` (if), `otherwise` (else), `since` (for), `when` (while), `switch`, `case`, `done` (default)
- **Functions**: `run` (function), `return`, `later` (async), `hold` (await)
- **Variables**: `let`, `fixed` (const), `var`
- **Objects**: `fresh` (new), `self` (this), `parent` (super), `model` (class), `inherits` (extends)
- **Operators**: `is` (===), `isnt` (!==), `more` (>), `less` (<), `and` (&&), `or` (||), `not` (!)
- **Console Methods**: `speak.say()`, `speak.scream()`, `speak.yell()` with contextual completion
- **Global Objects**: `thing` (Object), `list` (Array), `text` (String), `num` (Number), `clock` (Date), `maths` (Math), `json` (JSON)
- **Date Methods**: `clock.now()`, `clock.parse()` with contextual completion
- **Error Handling**: `test` (try), `grab` (catch), `atLast` (finally), `trigger` (throw)
- **Modules**: `share` (export), `use` (import) with module suggestions
- **Boolean Values**: `yes` (true), `no` (false), `null`, `undefined`

```javascript
// Smart keyword completion
run greet(name) {                    // 'run' auto-completes to function
    whatever (name is null) {        // 'whatever' → if, 'is' → ===
        return "Hello, stranger!";
    } otherwise {                    // 'otherwise' → else
        return `Hello, ${name}!`;
    }
}

// Method completion with contextual documentation
speak.say("Info message");           // Context-aware method suggestions
speak.scream("Error occurred!");     // With hover documentation
speak.yell("Warning!");              // JavaScript equivalent shown

// Object and type completion
fixed users = fresh list();          // 'fresh' → new, 'list' → Array
fixed now = fresh clock();           // 'clock' → Date
fixed data = json.parse(response);   // All global objects supported
```

#### 🎨 Smart Design Patterns

The extension includes intelligent design pattern snippets that generate complete, ready-to-use code structures:

```javascript
// Observer Pattern (type: observer-pattern)
model Subject {
    __init__() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notifyObservers(data) {
        this.observers.forEach(observer => observer.update(data));
    }
}

model Observer {
    update(data) {
        // Handle update
    }
}

// API Handler Pattern (type: api-handler)
run handleRequest(request, response) {
    test {
        fixed data = await processRequest(request);
        response.status(200).json({ success: true, data });
    } grab (error) {
        speak.scream('API Error:', error);
        response.status(500).json({ success: false, message: error.message });
    }
}

// Event Handler Pattern (type: event-handler)
model EventHandler {
    __init__() {
        this.listeners = {};
    }

    on(event, callback) {
        when (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        when (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }
}
```

### 📖 Enhanced Hover Documentation

Hover over any NullScript keyword to see comprehensive contextual information:

#### Basic Information

- **Description**: What the keyword does
- **JavaScript equivalent**: Shows the corresponding JS syntax
- **Syntax examples**: How to use the keyword
- **Code examples**: Real-world usage patterns
- **Category tips**: Best practices for each keyword type

#### Advanced Context Analysis

- **Contextual hints**: Smart suggestions based on current code context
  - Error handling warnings for `test`/`grab` blocks
  - Async function detection for `run later`
  - Class inheritance suggestions for `model`
  - Module organization tips for `use`/`share`
- **Performance insights**: Performance characteristics for each keyword category
- **Related keywords**: Shows other keywords in the same category
- **Best practices**: Coding recommendations specific to each keyword
- **Usage statistics**: How many times the keyword is used in the current file

#### Spell Checker Integration

- **Operator protection**: Special handling for NullScript operators that might be flagged by spell checkers
- **Dictionary suggestions**: Helpful notes about adding NullScript keywords to your spell checker dictionary

### 📦 Smart Import Assistant

The extension provides intelligent import management and suggestions:

#### Auto-Import Suggestions

- **Named imports**: Completion for common exports when typing inside `use { }`
  ```javascript
  use { fs, path, http } from // Suggests common Node.js modules
  use { express, lodash } from // Includes popular npm packages
  ```

#### Module Completions

- **Built-in modules**: Node.js core modules with descriptions
  - `fs` - File system operations
  - `path` - Path manipulation utilities
  - `http` - HTTP server and client
  - `express` - Fast web framework
  - `lodash` - Utility library

#### Import Pattern Helpers

- **Named imports template**: `use { exports } from 'module'`
- **Default import template**: `use name from 'module'`
- **Module suggestions**: Common modules with descriptions

### 🎨 Syntax Highlighting

Beautiful syntax highlighting that makes NullScript code easy to read:

- **Keywords**: Highlighted in theme colors
- **Strings**: Proper string highlighting with escape sequences
- **Comments**: Both single-line (`//`) and block comments (`/* */`)
- **Numbers**: Integer and floating-point number highlighting
- **Operators**: Visual distinction for NullScript operators

### 🎛️ Configurable Settings

Customize the extension behavior through VS Code settings:

```json
{
  "nullscript.completion.enabled": true,
  "nullscript.hover.enabled": true
}
```

## Language Support

### File Association

The extension automatically activates for files with the `.ns` extension:

```
my-script.ns
utils.ns
main.ns
```

### Code Snippets

Pre-built snippets for common NullScript patterns with intelligent placeholders:

#### Basic Snippets

| Prefix     | Description          | Output                                                                                          |
| ---------- | -------------------- | ----------------------------------------------------------------------------------------------- |
| `run`      | Function declaration | `run ${1:functionName}(${2:params}) {\n\t$0\n}`                                                 |
| `later`    | Async function       | `later run ${1:functionName}() {\n\t${2:// async code}\n\t$0\n}`                                |
| `whatever` | If statement         | `whatever (${1:condition}) {\n\t$0\n}`                                                          |
| `since`    | For loop             | `since (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n\t$0\n}`                             |
| `when`     | While loop           | `when (${1:condition}) {\n\t$0\n}`                                                              |
| `test`     | Try-catch block      | `test {\n\t${1:// code that might throw}\n} grab (${2:error}) {\n\t${3:// handle error}\n}`     |
| `model`    | Class declaration    | `model ${1:ClassName} {\n\t__init__(${2:params}) {\n\t\t${3:// constructor code}\n\t}\n\t$0\n}` |
| `fixed`    | Constant declaration | `fixed ${1:name} = ${2:value};`                                                                 |
| `let`      | Variable declaration | `let ${1:name} = ${2:value};`                                                                   |
| `share`    | Export statement     | `share { ${1:exports} };`                                                                       |
| `use`      | Import statement     | `use { ${1:imports} } from '${2:module}';`                                                      |
| `speak`    | Console log          | `speak.say(${1:message});`                                                                      |

#### Advanced Design Pattern Snippets

| Prefix             | Description             | Features                                           |
| ------------------ | ----------------------- | -------------------------------------------------- |
| `observer-pattern` | Observer Design Pattern | Complete Subject and Observer classes with methods |
| `api-handler`      | API Request Handler     | Full request/response handler with error handling  |
| `event-handler`    | Event Handler Class     | Complete event system with on/off/emit methods     |

## Configuration

### Extension Settings

Access settings via:

- **Command Palette**: `Preferences: Open Settings (UI)`
- **Menu**: File → Preferences → Settings
- **Search**: "NullScript"

#### Available Settings

| Setting                         | Type    | Default | Description                                             |
| ------------------------------- | ------- | ------- | ------------------------------------------------------- |
| `nullscript.completion.enabled` | boolean | `true`  | Enable intelligent auto-completion with design patterns |
| `nullscript.hover.enabled`      | boolean | `true`  | Enable enhanced contextual hover documentation          |

### Workspace Configuration

Add to your workspace settings (`.vscode/settings.json`):

```json
{
  "nullscript.completion.enabled": true,
  "nullscript.hover.enabled": true,
  "files.associations": {
    "*.ns": "nullscript"
  }
}
```

## Usage Examples

### Basic Development Workflow

1. **Create a new file**: `example.ns`
2. **Start typing**: The extension provides intelligent suggestions including design patterns
3. **Use smart imports**: Type `use ` for intelligent import assistance
4. **Hover for help**: Get enhanced contextual documentation for any keyword
5. **Apply patterns**: Use design pattern snippets like `observer-pattern` or `api-handler`

### Advanced Features

#### Performance Optimization

The extension is optimized for performance:

- **Keyword caching**: Fast lookup for NullScript keywords
- **Smart completion**: Context-aware suggestions
- **Efficient hover**: Fast documentation display
- **Memory management**: Optimized for VS Code performance

## Troubleshooting

### Common Issues

#### Extension Not Activating

**Problem**: Extension doesn't activate for `.ns` files
**Solution**:

1. Check file association in settings
2. Reload VS Code window (Ctrl+Shift+P → "Developer: Reload Window")
3. Verify extension is enabled in Extensions view

#### Auto-completion Not Working

**Problem**: No suggestions appearing
**Solution**:

1. Check `nullscript.completion.enabled` setting
2. Ensure you're in a `.ns` file
3. Try typing a few characters of a NullScript keyword

#### Hover Documentation Missing

**Problem**: No hover information showing
**Solution**:

1. Verify `nullscript.hover.enabled` is true
2. Hover over actual NullScript keywords
3. Check for conflicting extensions

### Performance Tips

- **Large files**: The extension is optimized for performance but very large files may see slower responses
- **Hover caching**: Keyword information is cached for better performance
- **Pattern optimization**: Design pattern snippets are pre-compiled for instant insertion

## Contributing to the Extension

We welcome contributions to improve the NullScript Intelligence extension! This section provides detailed information for developers who want to contribute.

### Development Environment Setup

#### Prerequisites

- **Node.js** 16+ and npm
- **Visual Studio Code** 1.74.0 or higher
- **Git** for version control
- **TypeScript** knowledge (extension is written in TypeScript)

#### Setting Up the Development Environment

1. **Fork and Clone**

   ```bash
   git fork https://github.com/nullscript-lang/nullscript-intelligence
   git clone https://github.com/nullscript-lang/nullscript-intelligence.git
   cd nullscript-intelligence
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Compile TypeScript**

   ```bash
   npm run compile
   # or for continuous compilation
   npm run watch
   ```

4. **Run Extension in Development Mode**
   - Press `F5` in VS Code to open a new Extension Development Host window
   - Or use Command Palette: `Debug: Start Debugging`

### Extension Architecture

#### File Structure

```
vscode-extension/
├── src/
│   ├── extension.ts          # Main extension entry point
│   ├── keywords.ts           # NullScript keyword definitions
│   └── interface.ts          # TypeScript interfaces
├── snippets/
│   └── nullscript.json       # Code snippets
├── syntaxes/
│   └── nullscript.tmLanguage.json  # Syntax highlighting
├── images/                   # Extension icons
├── package.json              # Extension manifest
└── language-configuration.json    # Language configuration
```

#### Key Components

**Completion Provider** (`src/extension.ts`)

- Handles auto-completion for keywords, methods, and imports
- Context-aware suggestions based on cursor position
- Design pattern snippets for common coding patterns

**Hover Provider** (`src/extension.ts`)

- Provides rich documentation on keyword hover
- Shows JavaScript equivalents and usage examples
- Performance hints and best practices

**Keywords System** (`src/keywords.ts`)

- Central repository of all NullScript keywords
- Categorized by functionality (Control Flow, Variables, etc.)
- Includes syntax examples and descriptions

### Contributing Guidelines

#### Types of Contributions

**🐛 Bug Fixes**

- Fix completion issues or incorrect suggestions
- Resolve hover documentation problems
- Address syntax highlighting bugs

**✨ Feature Enhancements**

- Add new keyword support
- Improve completion intelligence
- Enhance hover documentation
- Add new code snippets or design patterns

**📚 Documentation**

- Improve code comments
- Update README files
- Add usage examples
- Create developer guides

**🧪 Testing**

- Add unit tests for new features
- Create integration tests
- Test extension performance
- Validate across different VS Code versions

#### Development Workflow

1. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Your Changes**
   - Follow TypeScript best practices
   - Add proper type annotations
   - Include JSDoc comments for public methods

3. **Test Your Changes**

   ```bash
   # Compile and check for errors
   npm run compile

   # Test in development mode
   # Press F5 in VS Code
   ```

4. **Follow Code Style**
   - Use 2 spaces for indentation
   - Use meaningful variable and function names
   - Keep functions focused and concise
   - Add error handling where appropriate

5. **Commit and Push**

   ```bash
   git add .
   git commit -m "feat: add new keyword completion for 'example'"
   git push origin feature/your-feature-name
   ```

6. **Submit Pull Request**
   - Create a detailed pull request description
   - Include screenshots or GIFs for UI changes
   - Reference any related issues
   - Ensure all checks pass

#### Code Style Guidelines

**TypeScript Standards**

```typescript
// Use meaningful names
class NullScriptCompletionProvider implements vscode.CompletionItemProvider {
  // Add JSDoc for public methods
  /**
   * Provides completion items for NullScript keywords
   * @param document The text document
   * @param position Cursor position
   * @returns Array of completion items
   */
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
  ): Promise<vscode.CompletionItem[]> {
    // Implementation here
  }

  // Use private methods for internal logic
  private getKeywordCompletions(): vscode.CompletionItem[] {
    // Implementation here
  }
}
```

**Adding New Keywords**

```typescript
// In src/keywords.ts
{
  nullscript: "yournewkeyword",
  javascript: "javascriptequivalent",
  category: KeywordCategory.APPROPRIATE_CATEGORY,
  description: "Clear description of what this keyword does",
  syntax: "yournewkeyword (parameters) { ... }",
  example: "yournewkeyword (x > 5) { speak.say('Hello'); }"
}
```

#### Testing Your Changes

**Manual Testing Checklist**

- [ ] Extension activates properly for `.ns` files
- [ ] Auto-completion works for new keywords
- [ ] Hover documentation displays correctly
- [ ] Syntax highlighting is accurate
- [ ] No console errors in Extension Development Host
- [ ] Performance remains responsive

**Automated Testing**

```bash
# Run TypeScript compiler to check for errors
npm run compile

# Package extension to verify build
npm run package
```

### Common Development Tasks

#### Adding a New Keyword

1. **Add to Keywords Array** (`src/keywords.ts`)

   ```typescript
   {
     nullscript: "newkeyword",
     javascript: "equivalent",
     category: KeywordCategory.CONTROL_FLOW,
     description: "Description here",
     syntax: "newkeyword syntax",
     example: "newkeyword example"
   }
   ```

2. **Add Snippet** (`snippets/nullscript.json`)

   ```json
   "New Keyword": {
     "prefix": "newkeyword",
     "body": ["newkeyword ${1:param} {", "    $0", "}"],
     "description": "Description for snippet"
   }
   ```

3. **Test and Validate**
   - Verify completion works
   - Check hover documentation
   - Test snippet functionality

#### Improving Completion Intelligence

1. **Enhance Context Detection** (`src/extension.ts`)

   ```typescript
   // Add context-specific completion logic
   if (beforeCursor.endsWith("newcontext.")) {
     return this.getNewContextCompletions();
   }
   ```

2. **Add Method Completions**
   ```typescript
   private getNewContextCompletions(): vscode.CompletionItem[] {
     // Return context-specific completions
   }
   ```

#### Debugging Extension Issues

**Common Issues and Solutions**

- **Extension not activating**: Check `activationEvents` in `package.json`
- **Completions not showing**: Verify file language ID is "nullscript"
- **Hover not working**: Ensure keyword exists in `KEYWORDS` array
- **Performance issues**: Check for inefficient loops or heavy operations

**Debug Tools**

- Use VS Code Developer Tools (`Help > Toggle Developer Tools`)
- Check Extension Host console for errors
- Use `console.log()` for debugging (remove before committing)

### Resources for Contributors

**VS Code Extension Development**

- [VS Code Extension API](https://code.visualstudio.com/api)
- [Language Extension Guide](https://code.visualstudio.com/api/language-extensions/overview)

**TypeScript Resources**

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [VS Code Types](https://www.npmjs.com/package/@types/vscode)

**Testing and Quality**

- [Extension Testing](https://code.visualstudio.com/api/working-with-extensions/testing-extension)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Related

- [Installation Guide](/guide/installation) - Installing the NullScript CLI
- [Getting Started](/guide/getting-started) - Your first NullScript project
- [Keywords Reference](/reference/keywords) - Complete NullScript keyword list
- [CLI Usage](/cli/usage) - Command-line interface documentation
