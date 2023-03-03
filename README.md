![GitHub last commit](https://img.shields.io/github/last-commit/adrienz/zigzag-boilerplate.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/adrienz/zigzag-boilerplate.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# THIS REPO IS NOT MAINTAINED ANYMORE. JUST USE [VITE](https://vitejs.dev/) 💙

## ZigZag Boilerplate

#### The modern no-framework boilerplate

[documentation](doc.md)
💙
## What’s Included?

* Build-in [Vue.js](https://vuejs.org/) support.
* Modern tooling, ES6, SASS and EJS syntax support.
* Global variables between js, scss and html.
* A live development server that warns about common mistakes (powered by `webpack-dev-server` and/or `broswersync`).
* On build, compress images, autoprefix, minify files and cache busting
* Non obtrusive linter with prettier and ESLint.
* IE11 compatibility (configurable)
* ~~Out-of-the-box Progressive web app support.~~

## Installation

This boilerplate requires:
[Node.js](https://nodejs.org/) v6+ and [Webpack](https://webpack.js.org/).

You can download this boilerplate instantly with curl.

```
mkdir my-app
cd my-app
curl -L -o master.zip https://github.com/adrienZ/zigzag-boilerplate/archive/master.zip && unzip master.zip && rm master.zip && mv ./zigzag-boilerplate-master/{.,}* ./ && rm -r ./zigzag-boilerplate-master
```

To install dependcies :
```
npm install
```

## Commands

```
npm run start #dev -> local server
```

```
npm run build #production -> compilation
```

```
npm run watch #dev -> compile without server
```

## Linters

These linters runs with your local server and with the commands
```
npm run lint:js
```
```
npm run lint:scss
```

* [ESLint](https://eslint.org) :
  * Atom : `apm install linter-eslint`
  * VS Code : `ext install vscode-eslint`
* [Prettier](https://prettier.io) :
  * Atom: `apm install prettier-atom`
  * VS Code: `ext install prettier-vscode`

## Warning

Do not forget to edit your `package.json` before publishing your repo !

## LICENSE

MIT License

Copyright (c) 2020 Adrien Zaganelli

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
