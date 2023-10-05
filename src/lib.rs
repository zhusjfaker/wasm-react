mod utils;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, wasm-react!");
}

#[wasm_bindgen(module = "/web/react.development.js")]
extern "C" {
    fn createElement(
        element_type: JsValue,
        props: Option<JsValue>,
        children: Option<Vec<JsValue>>,
    ) -> JsValue;
}

#[wasm_bindgen]
pub fn test() {
    let ele = JsValue::from_str("div");
    createElement(ele, None, None);
}
