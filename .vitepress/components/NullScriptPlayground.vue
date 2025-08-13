<template>
    <div class="playground-container">
    <!-- Input Section - Full Width -->
    <div class="input-section">
      <h3>🎭 NullScript Code</h3>
      <textarea
        v-model="nullscriptCode"
        @input="debouncedTranspile"
        placeholder="// Write your NullScript code here..."
        class="code-input"
      ></textarea>
      <div class="button-group">
        <button @click="transpile" class="btn btn-primary">🔄 Transpile</button>
        <button @click="runCode" class="btn btn-success">▶️ Run Code</button>
        <button @click="clearAll" class="btn btn-secondary">🗑️ Clear</button>
        <button @click="copyJavaScript" class="btn btn-info">📋 Copy JS</button>
      </div>
    </div>

    <!-- Output Section - Horizontal Layout -->
    <div class="output-container">
      <div class="output-panel">
        <h3>⚡ JavaScript Output</h3>
        <div class="code-output">
          {{ javascriptCode || '// Transpiled JavaScript will appear here...' }}
        </div>
      </div>

      <div class="output-panel">
        <h3>🖥️ Console Output</h3>
        <div class="console-output" v-html="consoleOutput"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const nullscriptCode = ref(`// Write your NullScript code here...
run greet(name) {
  return \`Hello, \${name}! Welcome to NullScript! 🎭\`;
}

fixed message = greet('World');
speak.say(message);`)

const javascriptCode = ref('')
const consoleOutput = ref('// Execution results will appear here...')

// NullScript to JavaScript keyword mappings
const keywordMappings = {
  'run ': 'function ',
  'fixed ': 'const ',
  'whatever (': 'if (',
  'whatever(': 'if(',
  'otherwise whatever (': 'else if (',
  'otherwise whatever(': 'else if(',
  'otherwise ': 'else ',
  'since (': 'for (',
  'since(': 'for(',
  'when (': 'while (',
  'when(': 'while(',
  ' part ': ' of ',
  'speak.say(': 'console.log(',
  'speak.scream(': 'console.error(',
  'test {': 'try {',
  'grab (': 'catch (',
  'grab(': 'catch(',
  'atLast {': 'finally {',
  'trigger ': 'throw ',
  'model ': 'class ',
  '__init__(': 'constructor(',
  'self.': 'this.',
  'self ': 'this ',
  'fresh ': 'new ',
  ' inherits ': ' extends ',
  'run later ': 'async function ',
  'hold ': 'await ',
  ' yes': ' true',
  ' no': ' false',
  '(yes)': '(true)',
  '(no)': '(false)',
  ' yes;': ' true;',
  ' no;': ' false;',
  'use ': 'import ',
  'share ': 'export ',
  'fail(': 'Error(',
  'fail ': 'Error ',
  'pull(': 'fetch(',
}

// Transpile NullScript to JavaScript
function transpileNullScript(code) {
  let jsCode = code

  for (const [nullscript, javascript] of Object.entries(keywordMappings)) {
    const regex = new RegExp(nullscript.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
    jsCode = jsCode.replace(regex, javascript)
  }

  return jsCode
}

// Capture console output
function captureConsoleOutput() {
  const output = []
  const originalLog = console.log
  const originalError = console.error
  const originalWarn = console.warn

  console.log = (...args) => {
    output.push({
      type: 'log',
      content: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')
    })
    originalLog.apply(console, args)
  }

  console.error = (...args) => {
    output.push({
      type: 'error',
      content: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')
    })
    originalError.apply(console, args)
  }

  console.warn = (...args) => {
    output.push({
      type: 'warn',
      content: args.map(arg =>
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ')
    })
    originalWarn.apply(console, args)
  }

  return {
    getOutput: () => output,
    restore: () => {
      console.log = originalLog
      console.error = originalError
      console.warn = originalWarn
    }
  }
}

// Transpile code
function transpile() {
  try {
    const code = nullscriptCode.value.trim()
    if (!code) {
      javascriptCode.value = '// No code to transpile'
      return
    }

    javascriptCode.value = transpileNullScript(code)
    consoleOutput.value = '<span class="success">✅ Code transpiled successfully! Click "Run Code" to execute.</span>'
  } catch (error) {
    javascriptCode.value = '// Transpilation failed'
    consoleOutput.value = `<span class="error">❌ Transpilation Error: ${error.message}</span>`
  }
}

// Run transpiled code
function runCode() {
  if (!javascriptCode.value.trim()) {
    consoleOutput.value = '<span class="warning">⚠️ Please transpile the code first</span>'
    return
  }

  const capture = captureConsoleOutput()

  try {
    consoleOutput.value = ''

    // Execute code
    eval(javascriptCode.value)

    // Display captured output
    const output = capture.getOutput()
    if (output.length === 0) {
      consoleOutput.value = '<span class="success">✅ Code executed successfully (no output)</span>'
    } else {
      consoleOutput.value = output.map(item => {
        const className = item.type === 'error' ? 'error' : item.type === 'warn' ? 'warning' : ''
        const icon = item.type === 'error' ? '❌' : item.type === 'warn' ? '⚠️' : '📝'
        return `<span class="${className}">${icon} ${item.content}</span>`
      }).join('\n')
    }
  } catch (error) {
    consoleOutput.value = `<span class="error">❌ Runtime Error: ${error.message}</span>`
  } finally {
    capture.restore()
  }
}

// Clear all
function clearAll() {
  nullscriptCode.value = ''
  javascriptCode.value = '// Transpiled JavaScript will appear here...'
  consoleOutput.value = '// Execution results will appear here...'
}

// Copy JavaScript code
async function copyJavaScript() {
  if (!javascriptCode.value.trim()) {
    alert('No JavaScript code to copy. Please transpile first.')
    return
  }

  try {
    await navigator.clipboard.writeText(javascriptCode.value)
    consoleOutput.value = '<span class="success">✅ JavaScript code copied to clipboard!</span>'
    setTimeout(() => {
      if (consoleOutput.value.includes('copied to clipboard')) {
        consoleOutput.value = '// Execution results will appear here...'
      }
    }, 2000)
  } catch (error) {
    alert('Copy failed. Please select and copy manually.')
  }
}

// Debounced transpile
let transpileTimeout
function debouncedTranspile() {
  clearTimeout(transpileTimeout)
  transpileTimeout = setTimeout(transpile, 500)
}

// Initialize
onMounted(() => {
  transpile()
})
</script>

<style scoped>
.playground-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  min-height: 500px;
}

/* Tablet breakpoint */
@media (max-width: 1024px) {
  .playground-container {
    gap: 15px;
  }
}

/* Mobile breakpoint */
@media (max-width: 768px) {
  .playground-container {
    gap: 20px;
    margin: 15px 0;
  }
}

/* Small mobile breakpoint */
@media (max-width: 480px) {
  .playground-container {
    margin: 10px 0;
    gap: 15px;
  }
}

.input-section {
  display: flex;
  flex-direction: column;
  width: 100%;
}

/* Output container with vertical layout */
.output-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
}

/* Individual output panels */
.output-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-section h3, .output-panel h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

@media (max-width: 480px) {
  .input-section h3, .output-panel h3 {
    font-size: 1rem;
  }
}

.code-input {
  width: 100%;
  height: 300px;
  max-height: 300px;
  resize: none;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 14px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  line-height: 1.5;
  box-sizing: border-box;
}

/* Responsive textarea height */
@media (max-width: 768px) {
  .code-input {
    height: 250px;
  }
}

@media (max-width: 480px) {
  .code-input {
    height: 250px;
    font-size: 13px;
    padding: 10px;
  }
}

.code-input:focus {
  outline: none;
  border-color: var(--vp-c-brand);
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.2s;
  flex-shrink: 0;
  white-space: nowrap;
}

/* Responsive button sizing */
@media (max-width: 640px) {
  .btn {
    padding: 10px 14px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .btn {
    padding: 8px 12px;
    font-size: 12px;
    flex: 1;
    min-width: 0;
  }

  .button-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
  border: 1px solid var(--vp-c-border);
}

.btn-primary:hover {
  background: var(--vp-c-brand-dark);
}

.btn-success {
  background: #10b981;
  color: white;
  border: 1px solid var(--vp-c-border);
}

.btn-success:hover {
  background: #059669;
}

.btn-secondary {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  border: 1px solid var(--vp-c-border);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-soft);
}

.btn-info {
  background: #3b82f6;
  color: white;
  border: 1px solid var(--vp-c-border);
}

.btn-info:hover {
  background: #2563eb;
}

.code-output, .console-output {
  width: 100%;
  min-height: 200px;
  height: 200px; /* Fixed height for consistency */
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Courier New', monospace;
  font-size: 14px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  overflow-x: auto;
  overflow-y: auto; /* Allow vertical scrolling */
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 0; /* Remove bottom margin for consistent gap */
  box-sizing: border-box;
}

/* Responsive output areas */
@media (max-width: 768px) {
  .code-output, .console-output {
    height: 150px; /* Fixed height for mobile */
    min-height: 150px;
  }
}

@media (max-width: 480px) {
  .code-output, .console-output {
    font-size: 13px;
    padding: 10px;
  }
}

.console-output {
  background: #1a1a1a;
  color: #f0f0f0;
  border-color: #333;
}

/* Dark mode adjustments for mobile */
@media (max-width: 480px) {
  .console-output {
    background: #161616;
  }
}

.console-output .error {
  color: #ef4444;
}

.console-output .success {
  color: #10b981;
}

.console-output .warning {
  color: #f59e0b;
}

/* Touch-friendly improvements */
@media (hover: none) and (pointer: coarse) {
  .btn {
    padding: 12px 16px;
    font-size: 16px; /* Prevent zoom on iOS */
  }

  .code-input {
    font-size: 16px; /* Prevent zoom on iOS */
  }
}

/* Landscape mobile optimization */
@media (max-width: 768px) and (orientation: landscape) {
  .code-input {
    height: 180px;
  }

  .code-output, .console-output {
    min-height: 140px;
  }
}

/* Very small screens */
@media (max-width: 320px) {
  .playground-container {
    margin: 5px 0;
    gap: 10px;
  }

  .code-input {
    height: 180px;
    padding: 8px;
  }

  .code-output, .console-output {
    padding: 8px;
  }

  .btn {
    padding: 10px 8px;
    font-size: 11px;
  }
}
</style>
