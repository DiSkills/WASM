const fs = require('fs');
const bytes = fs.readFileSync('./loop.wasm');
const n = parseInt(process.argv[2] || "1");

let importObject = {
    env: {
        log: (i, factorial) => { console.log(`${i}! = ${factorial}`); }
    }
};

(async () => {
    let obj = await WebAssembly.instantiate(new Uint8Array(bytes),
        importObject);
    const result = obj.instance.exports.loop_test(n);
    console.log(`${n}! = ${result}`);
})();
