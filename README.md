# Tiny NoirJS app

This repo contains the full code from [this](https://noir-lang.org/docs/tutorials/noirjs_app) Noir docs page.

## Build

Uses `nargo` version 1.0.0-beta.2

### Compile the circuit

```bash
(cd circuit && nargo compile)
```

This will create the `circuit/target/circuit.json` file.

### Install dependencies

```bash
yarn
```

### Start vite server

```bash
yarn dev
```
