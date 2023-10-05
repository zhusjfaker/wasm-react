let wasm;

const cachedTextDecoder =
  typeof TextDecoder !== 'undefined'
    ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true })
    : {
        decode: () => {
          throw Error('TextDecoder not available');
        },
      };

if (typeof TextDecoder !== 'undefined') {
  cachedTextDecoder.decode();
}

let cachedUint8Memory0 = null;

function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
  ptr = ptr >>> 0;
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

async function init_wasm() {
  const res = await fetch('../pkg/wasm_react_bg.wasm');
  if (res.status == 200) {
    const buffer = await res.arrayBuffer();
    const module = await WebAssembly.compile(buffer);
    if (module) {
      console.log('wasm init success! \n', module);
      wasm = module;
    }
    const lib = new WebAssembly.Instance(module, {
      wbg: {
        __wbg_alert_8c923f120b2fd2e9: function (arg0, arg1) {
          alert(getStringFromWasm0(arg0, arg1));
        },
      },
    })?.exports;
    wasm = lib;
    const { greet } = lib;
    greet();
  } else {
    console.error('Failed to fetch wasm');
  }
}

init_wasm();

// http://127.0.0.1:8080/pkg/wasm_rust_bg.wasm
// http://127.0.0.1:8080/pkg/wasm_react_bg.wasm
