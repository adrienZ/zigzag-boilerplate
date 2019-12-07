![GitHub last commit](https://img.shields.io/github/last-commit/adrienz/zigzag-boilerplate.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/adrienz/zigzag-boilerplate.svg)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# ZigZag Boilerplate

#### The no-framework boilerplate

## What’s Included?

* ES6, SASS and EJS syntax support.
* Global variables between scss and html.
* A live development server that warns about common mistakes.
* Aliases (@) to easily include files, also availble in html and sass.
* On build, compress images, autoprefix, minify files and cache busting
* Non obtrusive linter with prettier and ESLint.
* ~~Out-of-the-box Progressive web app support
* ~~Easily deploy your app to Github Pages.~~
* ~~Javascript and sass files are prettyfied on save and on commits

## Installation

This boilerplate requires:
[Node.js](https://nodejs.org/) v6+ and [Webpack](https://webpack.js.org/).

```
$ mkdir my-app
$ cd my-app
$ curl -L -o master.zip https://github.com/adrienZ/zigzag-boilerplate/archive/master.zip && unzip master.zip && rm master.zip && mv ./zigzag-boilerplate-master/{.,}* ./ && rm -r ./zigzag-boilerplate-master
$ npm run hello
```

## Commands

```
$ npm run hello #setup
```

```
$ npm run start #dev on webpack dev server
```

```
$ npm run build #production
```

```
$ npm run watch #watch and ouput files
```

#### Code quality

```
$ npm run format-js #run prettier on your js
```

```
$ npm run format-scss #run prettier on your scss
```

## Features

When you follow the folder structure, it give you access to some handy aliases.
You can found them in `webpack/urls.js`.

Adding media has never been so easy !

In javascript, we rely on webpack aliases

```javascript
import myImgPath from '@img/example.jpg'
```

In sass, we inject vars through the `sass-loader`:

```sass
.myDiv {
  background: url("#{$img}/example.jpg")
}

@font-face {
  font-family: 'MyFont';
  src: url(#{$fonts}example-font.ttf);
  font-weight: normal;
  font-style: normal;
}
```

In html (.ejs), we inject vars through the `htmlWebpackPlugin`

```ejs
<img src="<%= $img %>example.jpg">
```

## Caveats

the `htmlWebpackPlugin` does not allow HMR.
you can either :

* forget about it
* activate live reload, but lose HMR. you have to include your file in your js like this:

```javascript
import 'ejs-loader!@base/index.ejs'
```

## Linters

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

Copyright (c) 2018 Adrien Zaganelli

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