# IDE Support

NullScript provides excellent development experience across different editors and IDEs through various extensions and integrations.

## Visual Studio Code

The **NullScript Intelligence** extension is the most comprehensive IDE support available for NullScript development.

### Quick Setup

1. Install the [NullScript Intelligence](https://marketplace.visualstudio.com/items?itemName=nullscript-lang.nullscript-intelligence) extension
2. Open any `.ns` file
3. Start coding with full IntelliSense support!

[📖 Full VS Code Extension Guide →](/guide/vscode-extension)

## Language Server Protocol

NullScript is built with Language Server Protocol (LSP) compatibility in mind, making it easy to add support to any LSP-compatible editor.

### Supported Features

- **Syntax Highlighting**: Full syntax highlighting for NullScript keywords
- **Auto-completion**: Intelligent keyword and method suggestions
- **Hover Information**: Contextual documentation on hover
- **Error Detection**: Real-time syntax and semantic error checking
- **Go to Definition**: Navigate to function and variable definitions
- **Find References**: Find all usages of symbols

## Other Editors

### Sublime Text

Create a NullScript syntax definition:

1. Create `NullScript.sublime-syntax` in your Packages folder
2. Add syntax rules based on JavaScript with NullScript keywords
3. Associate `.ns` files with the NullScript syntax

### Atom

Use the Tree-sitter grammar system:

1. Create a tree-sitter grammar for NullScript
2. Generate syntax highlighting rules
3. Package as an Atom extension

### Vim/Neovim

Create a Vim syntax file:

```vim
" Place in ~/.vim/syntax/nullscript.vim
if exists("b:current_syntax")
  finish
endif

" NullScript keywords
syn keyword nsKeyword run return whatever otherwise since when
syn keyword nsKeyword fixed let share use test grab later
syn keyword nsKeyword model inherits speak yes no null undefined

" Comments
syn match nsComment "//.*$"
syn region nsComment start="/\*" end="\*/"

" Strings
syn region nsString start='"' skip='\\"' end='"'
syn region nsString start="'" skip="\\'" end="'"

" Numbers
syn match nsNumber "\d\+"
syn match nsNumber "\d\+\.\d\+"

" Highlight groups
hi def link nsKeyword Keyword
hi def link nsComment Comment
hi def link nsString String
hi def link nsNumber Number

let b:current_syntax = "nullscript"
```

### Emacs

Create a major mode for NullScript:

```elisp
;; nullscript-mode.el
(defvar nullscript-keywords
  '("run" "return" "whatever" "otherwise" "since" "when"
    "fixed" "let" "share" "use" "test" "grab" "later"
    "model" "inherits" "speak" "yes" "no" "null" "undefined"))

(defvar nullscript-font-lock-keywords
  `((,(regexp-opt nullscript-keywords 'words) . font-lock-keyword-face)))

(define-derived-mode nullscript-mode javascript-mode "NullScript"
  "Major mode for editing NullScript files."
  (setq font-lock-defaults '(nullscript-font-lock-keywords)))

(add-to-list 'auto-mode-alist '("\\.ns\\'" . nullscript-mode))
```

## Web Editors

### Monaco Editor

Add NullScript support to Monaco (used in VS Code Web):

```javascript
import * as monaco from 'monaco-editor';

// Register NullScript language
monaco.languages.register({ id: 'nullscript' });

// Add syntax highlighting
monaco.languages.setMonarchTokensProvider('nullscript', {
  tokenizer: {
    root: [
      [/\b(run|return|whatever|otherwise|since|when|fixed|let|share|use|test|grab|later|model|inherits|speak|yes|no|null|undefined)\b/, 'keyword'],
      [/"([^"\\]|\\.)*$/, 'string.invalid'],
      [/"/, 'string', '@string_double'],
      [/'/, 'string', '@string_single'],
      [/\/\/.*$/, 'comment'],
      [/\/\*/, 'comment', '@comment'],
      [/\d+(\.\d+)?/, 'number'],
    ],
    string_double: [
      [/[^\\"]+/, 'string'],
      [/\\./, 'string.escape'],
      [/"/, 'string', '@pop']
    ],
    string_single: [
      [/[^\\']+/, 'string'],
      [/\\./, 'string.escape'],
      [/'/, 'string', '@pop']
    ],
    comment: [
      [/[^\/*]+/, 'comment'],
      [/\*\//, 'comment', '@pop'],
      [/[\/*]/, 'comment']
    ]
  }
});

// Add auto-completion
monaco.languages.registerCompletionItemProvider('nullscript', {
  provideCompletionItems: (model, position) => {
    const suggestions = [
      {
        label: 'run',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'run ${1:functionName}(${2:params}) {\n\t$0\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      },
      {
        label: 'whatever',
        kind: monaco.languages.CompletionItemKind.Keyword,
        insertText: 'whatever (${1:condition}) {\n\t$0\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
      }
      // Add more completions...
    ];
    return { suggestions };
  }
});
```

### CodeMirror

Add NullScript mode to CodeMirror:

```javascript
import { LanguageSupport, LRLanguage } from '@codemirror/language';
import { parser } from './nullscript-parser'; // Generated from grammar

const nullscriptLanguage = LRLanguage.define({
  parser: parser,
  languageData: {
    commentTokens: { line: '//', block: { open: '/*', close: '*/' } },
    indentOnInput: /^\s*[{}]$/
  }
});

export function nullscript() {
  return new LanguageSupport(nullscriptLanguage);
}
```

## Development Tools Integration

### Prettier

Configure Prettier to format NullScript files:

```json
{
  "overrides": [
    {
      "files": "*.ns",
      "options": {
        "parser": "babel",
        "printWidth": 80,
        "tabWidth": 2,
        "useTabs": false,
        "semi": true,
        "singleQuote": true,
        "trailingComma": "es5"
      }
    }
  ]
}
```

### ESLint

Create ESLint configuration for NullScript:

```javascript
// eslint-plugin-nullscript
module.exports = {
  rules: {
    'use-nullscript-keywords': {
      create(context) {
        return {
          FunctionDeclaration(node) {
            if (node.type === 'FunctionDeclaration') {
              context.report({
                node,
                message: 'Use "run" instead of "function" in NullScript',
                fix(fixer) {
                  return fixer.replaceText(node, node.source().replace('function', 'run'));
                }
              });
            }
          }
        };
      }
    }
  }
};
```

### Webpack

Configure Webpack to handle `.ns` files:

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.ns$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
          {
            loader: 'nullscript-loader' // Custom loader to transpile .ns to .js
          }
        ]
      }
    ]
  }
};
```

## GitHub Integration

### Syntax Highlighting

GitHub automatically detects `.ns` files and provides basic syntax highlighting through Linguist.

### Adding to Linguist

To improve GitHub support, contribute to [GitHub Linguist](https://github.com/github/linguist):

```yaml
# languages.yml
NullScript:
  type: programming
  color: "#f1e05a"
  extensions:
  - ".ns"
  tm_scope: source.nullscript
  ace_mode: javascript
  language_id: 998
```

### VS Code Web

The NullScript Intelligence extension works in VS Code for the Web (vscode.dev), providing full IDE support in the browser.

## Community Extensions

### Popular Extensions

- **NullScript Intelligence** (Official) - Full IDE support for VS Code
- **NullScript Snippets** - Additional code snippets
- **NullScript Themes** - Syntax highlighting themes optimized for NullScript

### Creating Your Own Extension

See our [Extension Development Guide](https://github.com/nullscript-lang/nullscript/blob/main/docs/EXTENSION_DEVELOPMENT.md) for creating IDE extensions.

## Related

- [VS Code Extension](/guide/vscode-extension) - Detailed VS Code extension documentation
- [Installation](/guide/installation) - Setting up NullScript development environment
- [CLI Usage](/cli/usage) - Command-line tools for NullScript development
