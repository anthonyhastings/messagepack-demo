# MessagePack

## Introduction

![Demonstration](https://github.com/anthonyhastings/messagepack-demo/assets/167421/38edf1b5-8a8b-4dc0-a767-82d8a9a83bef)

This repository showcases using MessagePack; an efficient binary serialization format. It can be used as an alternative data exchange format to others such as Base64 and JSON with the advantage of having a smaller footprint than both. Base64 uses 4 characters to encode three bytes, and will pad bytes as necessary using an equals sign. This means the final output will always be larger than the original data.

In most cases the overhead of larger output from formats such as Base64 or JSON is justifiable for the ease of use and readability those data formats provide to the recipient. It’s easy to read and requires little to no transformation to be usable. There are however, other scenarios with stronger considerations than ease of use. Certain scenarios prioritise lower bandwidth usage to reduce costs and increase transfer speeds which can then allow for more frequent communication. Some example use cases that fall under these scenarios are:
  - A camera infrequently transmitting still imagery.
  - A telematics device frequently transmitting remote diagnostics and location data.

The demonstration within this repository showcases an example resource object to transfer from a server to a caller. The service uses Express and has a single endpoint that can return the resource object either as JSON or as binary via MessagePack. Worth taking note of is the size of the response bodies for each format which will show MessagePack being the more compact format.

## Instructions

These instructions assume you are running a version of NodeJS equal to or greater than the version mentioned in the `.nvmrc` file and have Yarn installed:

1. Install dependencies

```bash
yarn install
```

2. Start the service _(and examine the output)_

```bash
yarn run-server
```

3. Run the example client _(which will also decode the response)_

```bash
yarn run-client
```

4. (Optional) Compare response sizes from the JSON and binary responses

```bash
curl --location 'http://localhost:3000/send-msgpack' --head && \
curl --location 'http://localhost:3000/send-msgpack' --head --header 'Accept: application/msgpack'
```

## Further Reading

- [MessagePack](https://msgpack.org/)
- [NPM: @msgpack/msgpack](https://www.npmjs.com/package/@msgpack/msgpack)
- [Optimizing network footprint using MessagePack](https://ankitbko.github.io/blog/2022/06/messagepack-vs-base64)
