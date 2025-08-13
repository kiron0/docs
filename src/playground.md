# NullScript Playground

Try NullScript code live in your browser! Write NullScript code in the editor below and see it transpiled to JavaScript in real-time.

<ClientOnly>
  <Playground />
</ClientOnly>

## Example Snippets

Try these examples in the playground above:

### Basic Function

```javascript
run add(a, b) {
  return a + b;
}

fixed result = add(5, 3);
speak.say(`Result: ${result}`);
```

### Control Flow

```javascript
run checkNumber(num) {
  whatever (num > 0) {
    speak.say("Positive number");
  } otherwise whatever (num < 0) {
    speak.say("Negative number");
  } otherwise {
    speak.say("Zero");
  }
}

checkNumber(42);
```

### Classes

```javascript
model Calculator {
  __init__() {
    self.result = 0;
  }

  run add(value) {
    self.result += value;
    return self;
  }

  run getResult() {
    return self.result;
  }
}

fixed calc = fresh Calculator();
calc.add(10).add(5);
speak.say(`Total: ${calc.getResult()}`);
```

### Error Handling

```javascript
run safeDivide(a, b) {
  test {
    whatever (b === 0) {
      trigger fresh fail("Division by zero!");
    }
    return a / b;
  } grab (error) {
    speak.scream(`Error: ${error.message}`);
    return null;
  }
}

fixed result = safeDivide(10, 2);
speak.say(`Result: ${result}`);
```

### Arrays and Loops

```javascript
fixed fruits = ["apple", "banana", "cherry"];

since (fixed fruit part fruits) {
  speak.say(`I love ${fruit}!`);
}

fixed numbers = [1, 2, 3, 4, 5];
fixed doubled = numbers.map(n => n * 2);
speak.say(`Doubled: ${doubled}`);
```

## Features

- **🔄 Real-time Transpilation**: See JavaScript output as you type
- **▶️ Code Execution**: Run your code directly in the browser
- **📋 Copy Support**: Copy transpiled JavaScript with one click
- **🎨 Syntax Highlighting**: Clear visual distinction between code and output
- **📱 Mobile Friendly**: Works on desktop and mobile devices
- **🚀 No Setup Required**: Start coding immediately
- **🎛️ Keyword Mapping**: Uses client-side transpilation for instant results

::: info Transpilation Method
This playground uses client-side keyword mapping for instant transpilation. For production use with advanced features, use the [NullScript CLI](./cli/usage) with the `nsc` command.
:::

## How to Use

1. **Write Code**: Enter NullScript code in the left textarea
2. **Auto-Transpile**: Code is automatically transpiled as you type
3. **Manual Transpile**: Click "🔄 Transpile" to transpile manually
4. **Run Code**: Click "▶️ Run Code" to execute the JavaScript
5. **View Output**: See console output in the bottom panel
6. **Copy JavaScript**: Use "📋 Copy JS" to copy the transpiled code

## Keyboard Shortcuts

- **Ctrl/Cmd + Enter**: Transpile and run code
- **Ctrl/Cmd + Shift + C**: Copy JavaScript output
- **Ctrl/Cmd + Shift + X**: Clear all content

## Tips

- Start with simple examples and gradually try more complex code
- Use the example snippets as starting points
- Check the console output for errors and results
- Experiment with different NullScript features
- Copy the JavaScript output to use in your projects

Try the examples above or write your own NullScript code to see the magic happen! 🎭✨
