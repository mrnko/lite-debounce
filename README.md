# LiteDebounce

[![mrnko - lite-debounce-js](https://img.shields.io/static/v1?label=mrnko&message=lite-debounce-js&color=blue&logo=github)](https://github.com/mrnko/lite-debounce-js "Go to GitHub repo")
[![stars - lite-debounce-js](https://img.shields.io/github/stars/mrnko/lite-debounce-js?style=social)](https://github.com/mrnko/lite-debounce-js)
[![forks - lite-debounce-js](https://img.shields.io/github/forks/mrnko/lite-debounce-js?style=social)](https://github.com/mrnko/lite-debounce-js)

A lightweight, dependency-free debounce utility for JavaScript functions. Supports both leading and trailing edge execution. Perfect for input handlers, resize events, and performance optimization in modern web apps.

[![npm version](https://img.shields.io/npm/v/lite-debounce-js.svg?style=flat-square)](https://www.npmjs.com/package/lite-debounce-js)
[View Demo](https://mrnko.github.io/lite-debounce-js/demo/index.html) • [View on GitHub](https://github.com/mrnko/lite-debounce-js)

---

## Features
- **Zero dependencies**
- **ESM build**
- **Leading/trailing edge** debounce
- **Context (`this`) support**
- **Tiny & fast**

---

## Installation

```bash
npm install lite-debounce-js
```
Or simply copy the file from `dist/` into your project.

---

## Usage

### Import
```js
// ESM (from npm)
import { LiteDebounce } from 'lite-debounce-js';
// Or import from local build:
import { LiteDebounce } from './dist/lite-debounce.min.js';
```

### Basic trailing debounce (default)
```js
const debouncer = new LiteDebounce(() => {
  console.log('Debounced!');
}, 300); // 300ms delay

window.addEventListener('resize', debouncer.fnDebounced);
```

### Leading debounce
```js
const debouncer = new LiteDebounce(() => {
  console.log('Leading call!');
}, 500, { leading: true });

const debouncedFn = debouncer.fnDebounced;
debouncedFn(); // will be called immediately
```

### With arguments and context
```js
const obj = {
  value: 42,
  log() {
    console.log(this.value);
  }
};
const debouncer = new LiteDebounce(obj.log, 200);
const debouncedFn = debouncer.fnDebounced.bind(obj);
debouncedFn(); // logs: 42
```

---

## API

### `new LiteDebounce(fn, delay = 300, options = {})`
- `fn` — function to debounce
- `delay` — debounce delay in ms (default: 300)
- `options.leading` — if `true`, call on the leading edge (default: `false`)

#### Instance property:
- `.fnDebounced` — debounced function, use it in event listeners or anywhere

---

## Demo

Open [`demo/index.html`](./demo/index.html) in your browser (with a local server) or run the dev server:
```bash
npm run dev
```

---

## Testing

```bash
npm test
```
Tests are written with [Vitest](https://vitest.dev/).