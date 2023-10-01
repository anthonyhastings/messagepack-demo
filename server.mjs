import assert from "node:assert";
import fs from "node:fs/promises";
import { encode, decode } from "@msgpack/msgpack";
import express from "express";

// Example object for comparison with the buffered bytes from example file.
const testObject = {
  nil: null,
  integer: 1,
  float: Math.PI,
  string: "Hello, world!",
  boolean: false,
  binary: Buffer.from([1, 2, 3]),
  array: [10, 20, 30],
  map: { foo: "bar" },
};

// With no encoding specified, the data is returned as a <Buffer> object.
const fileData = decode(await fs.readFile("./example.messagepack"));

// Confirm that the in-memory version matches the version from file.
assert.deepStrictEqual(fileData, testObject);

const jsonVersion = JSON.stringify(testObject);
const messagePackVersion = Buffer.from(encode(testObject));

console.log("\n");
console.log("Decoded MessagePack from file:", fileData);
console.log("\n");
console.group("JSON Version");
console.log("Value:", jsonVersion);
console.log("Size:", `${new TextEncoder().encode(jsonVersion).length} Bytes`);
console.groupEnd();
console.log("\n");
console.group("Message Pack Version");
console.log("Value:", messagePackVersion);
console.log("Size:", `${messagePackVersion.byteLength} Bytes`);
console.log('Is "Buffer" type?', ArrayBuffer.isView(messagePackVersion));
console.groupEnd();

const app = express();

app.get("/send-msgpack", (req, res) => {
  if (req.headers.accept.includes('application/msgpack')) {
    res.setHeader("Content-Type", "application/msgpack");
    res.send(messagePackVersion);
  } else {
    res.setHeader("Content-Type", "application/json");
    res.send(jsonVersion);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
