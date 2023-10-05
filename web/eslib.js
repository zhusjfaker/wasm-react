import init, { greet } from '../pkg/wasm_react.js';

async function run() {
  await init();
  greet();
}

run();