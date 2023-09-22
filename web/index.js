async function init_wasm() {
  const res = await fetch('../pkg/wasm_react_bg.wasm');
  if (res.status == 200) {
    const buffer = await res.arrayBuffer();
    const wasm_module = WebAssembly.instantiate(buffer, {});
    console.log('wasm init success! \n', wasm_module);
  } else {
    console.error('Failed to fetch wasm');
  }
}

init_wasm();


// http://127.0.0.1:8080/pkg/wasm_rust_bg.wasm
// http://127.0.0.1:8080/pkg/wasm_react_bg.wasm
