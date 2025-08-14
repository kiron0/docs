<template>
  <div class="playground-container">
    <div class="input-section">
      <h3>🎭 NullScript Code</h3>
      <textarea
        v-model="nullScriptCode"
        @input="debouncedTranspile"
        placeholder="// Write your NullScript code here..."
        class="code-input"
      ></textarea>
      <div class="button-group">
        <button
          @click="transpile"
          :disabled="isInputEmpty"
          class="btn btn-primary"
        >
          🔄 Transpile
        </button>
        <button
          @click="runCode"
          :disabled="isInputEmpty"
          class="btn btn-success"
        >
          ▶️ Run Code
        </button>
        <button
          @click="clearAll"
          :disabled="isInputEmpty"
          class="btn btn-secondary"
        >
          🗑️ Clear
        </button>
        <button
          @click="copyJavaScript"
          :disabled="isInputEmpty"
          class="btn btn-info"
        >
          📋 Copy JS
        </button>
      </div>
    </div>

    <div class="output-container">
      <div class="output-panel">
        <h3>⚡ JavaScript Output</h3>
        <div class="code-output">
          {{ javascriptCode || "// Transpiled JavaScript will appear here..." }}
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
import { computed, onMounted, ref } from "vue";

const nullScriptCode = ref(`// Write your NullScript code here...
run greet(name) {
  return \`Hello, \${name}! Welcome to NullScript! 🎭\`;
}

fixed message = greet('World');
speak.say(message);`);

const javascriptCode = ref("");
const consoleOutput = ref("// Execution results will appear here...");

const isInputEmpty = computed(() => {
  return !nullScriptCode.value.trim();
});

let compilerStatus = "checking";

async function checkCompilerAvailability() {
  try {
    compilerStatus = "unavailable";
    console.info("Using client-side keyword mapping for transpilation");
    return false;
  } catch (error) {
    compilerStatus = "unavailable";
    return false;
  }
}

async function transpileNullScript(code) {
  if (compilerStatus === "checking") {
    await checkCompilerAvailability();
  }

  return fallbackTranspile(code);
}

function fallbackTranspile(code) {
  const keywordMappings = {
    "run ": "function ",
    "fixed ": "const ",
    "whatever (": "if (",
    "whatever(": "if(",
    "otherwise whatever (": "else if (",
    "otherwise whatever(": "else if(",
    "otherwise ": "else ",
    "since (": "for (",
    "since(": "for(",
    "when (": "while (",
    "when(": "while(",
    " part ": " of ",
    "speak.say(": "console.log(",
    "speak.scream(": "console.error(",
    "test {": "try {",
    "grab (": "catch (",
    "grab(": "catch(",
    "atLast {": "finally {",
    "trigger ": "throw ",
    "model ": "class ",
    "__init__(": "constructor(",
    "self.": "this.",
    "self ": "this ",
    "fresh ": "new ",
    " inherits ": " extends ",
    "run later ": "async function ",
    "hold ": "await ",
    " yes": " true",
    " no": " false",
    "(yes)": "(true)",
    "(no)": "(false)",
    " yes;": " true;",
    " no;": " false;",
    "use ": "import ",
    "share ": "export ",
    "fail(": "Error(",
    "fail ": "Error ",
    "pull(": "fetch(",
  };

  let jsCode = code.replace(/\/\/.*$/gm, "");

  jsCode = jsCode.replace(/\/\*[\s\S]*?\*\//g, "");

  jsCode = jsCode
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .join("\n");

  for (const [nullscript, javascript] of Object.entries(keywordMappings)) {
    const regex = new RegExp(
      nullscript.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g",
    );
    jsCode = jsCode.replace(regex, javascript);
  }

  return jsCode;
}

function captureConsoleOutput() {
  const output = [];
  const originalLog = console.log;
  const originalError = console.error;
  const originalWarn = console.warn;

  console.log = (...args) => {
    output.push({
      type: "log",
      content: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(" "),
    });
    originalLog.apply(console, args);
  };

  console.error = (...args) => {
    output.push({
      type: "error",
      content: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(" "),
    });
    originalError.apply(console, args);
  };

  console.warn = (...args) => {
    output.push({
      type: "warn",
      content: args
        .map((arg) =>
          typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg),
        )
        .join(" "),
    });
    originalWarn.apply(console, args);
  };

  return {
    getOutput: () => output,
    restore: () => {
      console.log = originalLog;
      console.error = originalError;
      console.warn = originalWarn;
    },
  };
}

async function transpile() {
  if (isInputEmpty.value) return;

  try {
    const code = nullScriptCode.value.trim();
    if (!code) {
      javascriptCode.value = "// No code to transpile";
      return;
    }

    const compilerType =
      compilerStatus === "available"
        ? "official NullScript compiler"
        : "keyword mapping";
    consoleOutput.value = `<span class="info">🔄 Transpiling with ${compilerType}...</span>`;

    const result = await transpileNullScript(code);
    javascriptCode.value = result;
    consoleOutput.value =
      '<span class="success">✅ Code transpiled successfully! Click "Run Code" to execute.</span>';
  } catch (error) {
    javascriptCode.value = "// Transpilation failed";
    consoleOutput.value = `<span class="error">❌ Transpilation Error: ${error.message}</span>`;
  }
}

function runCode() {
  if (isInputEmpty.value) return;

  if (!javascriptCode.value.trim()) {
    consoleOutput.value =
      '<span class="warning">⚠️ Please transpile the code first</span>';
    return;
  }

  const capture = captureConsoleOutput();

  try {
    consoleOutput.value = "";

    const executeCode = new Function(javascriptCode.value);
    executeCode();

    const output = capture.getOutput();
    if (output.length === 0) {
      consoleOutput.value =
        '<span class="success">✅ Code executed successfully (no output)</span>';
    } else {
      consoleOutput.value = output
        .map((item) => {
          const className =
            item.type === "error"
              ? "error"
              : item.type === "warn"
                ? "warning"
                : "";
          return `<span class="${className}">${item.content}</span>`;
        })
        .join("\n");
    }
  } catch (error) {
    consoleOutput.value = `<span class="error">❌ Runtime Error: ${error.message}</span>`;
  } finally {
    capture.restore();
  }
}

function clearAll() {
  if (isInputEmpty.value) return;

  nullScriptCode.value = "";
  javascriptCode.value = "// Transpiled JavaScript will appear here...";
  consoleOutput.value = "// Execution results will appear here...";
}

async function copyJavaScript() {
  if (isInputEmpty.value) return;

  if (!javascriptCode.value.trim()) {
    alert("No JavaScript code to copy. Please transpile first.");
    return;
  }

  try {
    await navigator.clipboard.writeText(javascriptCode.value);
    consoleOutput.value =
      '<span class="success">✅ JavaScript code copied to clipboard!</span>';
    setTimeout(() => {
      if (consoleOutput.value.includes("copied to clipboard")) {
        consoleOutput.value = "// Execution results will appear here...";
      }
    }, 2000);
  } catch (error) {
    alert("Copy failed. Please select and copy manually.");
  }
}

let transpileTimeout;
function debouncedTranspile() {
  clearTimeout(transpileTimeout);
  transpileTimeout = setTimeout(() => transpile(), 500);
}

onMounted(async () => {
  await checkCompilerAvailability();
  await transpile();
});
</script>

<style scoped>
.playground-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
  min-height: 500px;
}

@media (max-width: 1024px) {
  .playground-container {
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .playground-container {
    gap: 20px;
    margin: 15px 0;
  }
}

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

.output-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
}

.output-panel {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.input-section h3,
.output-panel h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

@media (max-width: 480px) {
  .input-section h3,
  .output-panel h3 {
    font-size: 1rem;
  }
}

.code-input {
  width: 100%;
  height: 300px;
  max-height: 300px;
  resize: none;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Courier New", monospace;
  font-size: 14px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  line-height: 1.5;
  box-sizing: border-box;
}

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

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: var(--vp-c-bg-mute) !important;
  color: var(--vp-c-text-3) !important;
  border: 1px solid var(--vp-c-border) !important;
}

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
  color: #000;
  border: 1px solid var(--vp-c-border);
}

.btn-primary:hover:not(:disabled) {
  background: #e6c800;
  transition: all 0.2s;
}

.btn-success {
  background: #10b981;
  color: white;
  border: 1px solid var(--vp-c-border);
}

.btn-success:hover:not(:disabled) {
  background: #059669;
  transition: all 0.2s;
}

.btn-secondary {
  background: red;
  color: white;
  border: 1px solid red;
}

.btn-secondary:hover:not(:disabled) {
  background: #b91c1c;
  transition: all 0.2s;
}

.btn-info {
  background: #3b82f6;
  color: white;
  border: 1px solid var(--vp-c-border);
}

.btn-info:hover:not(:disabled) {
  background: #2563eb;
  transition: all 0.2s;
}

.code-output,
.console-output {
  width: 100%;
  min-height: 200px;
  height: 200px;
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Courier New", monospace;
  font-size: 14px;
  border: 2px solid var(--vp-c-border);
  border-radius: 8px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  overflow-x: auto;
  overflow-y: auto;
  white-space: pre-wrap;
  line-height: 1.5;
  margin-bottom: 0;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .code-output,
  .console-output {
    height: 150px;
    min-height: 150px;
  }
}

@media (max-width: 480px) {
  .code-output,
  .console-output {
    font-size: 13px;
    padding: 10px;
  }
}

.console-output {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-border);
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

.console-output .info {
  color: #3b82f6;
}

@media (hover: none) and (pointer: coarse) {
  .btn {
    padding: 12px 16px;
    font-size: 16px;
  }

  .code-input {
    font-size: 16px;
  }
}

@media (max-width: 768px) and (orientation: landscape) {
  .code-input {
    height: 180px;
  }

  .code-output,
  .console-output {
    min-height: 140px;
  }
}

@media (max-width: 320px) {
  .playground-container {
    margin: 5px 0;
    gap: 10px;
  }

  .code-input {
    height: 180px;
    padding: 8px;
  }

  .code-output,
  .console-output {
    padding: 8px;
  }

  .btn {
    padding: 10px 8px;
    font-size: 11px;
  }
}
</style>
