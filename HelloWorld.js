const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/HelloWorld.wasm');

let hello_world = null;
let start_string_index = 100;
let memory = new WebAssembly.Memory({initial: 1});

let importObject = {
    env: {
        buffer: memory,
        start_string: start_string_index,
        print_string: function (strlen) {
            const bytes = new Uint8Array(memory.buffer,
                start_string_index, strlen);
            const log_string = new TextDecoder('utf8').decode(bytes);
            console.log(log_string);
        }
    }
};

(async () => {
    let obj = await WebAssembly.instantiate(new Uint8Array(bytes),
        importObject);
    ({HelloWorld: hello_world} = obj.instance.exports);
    hello_world();
})();
