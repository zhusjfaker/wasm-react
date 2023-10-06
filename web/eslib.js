import init, { test } from '../pkg/wasm_react.js';

async function run() {
  await init();
  if (ReactDOM) {
    const ele = test();
    ReactDOM.render(ele, document.getElementById('root'));
  }
}

run();

