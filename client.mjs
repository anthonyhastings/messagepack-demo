import { decodeAsync } from "@msgpack/msgpack";

const response = await fetch("http://localhost:3000/send-msgpack", {
  headers: {
    accept: "application/msgpack",
  },
});

console.log('Response Data (Dencoded):', await decodeAsync(response.body));