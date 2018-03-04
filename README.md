# ZigZag Boilerplate

#### The no-framework boilerplate


## What’s Included?

* ES6, SASS and EJS syntax support.
* Autoprefixed CSS, so you don’t need `-webkit-` or other prefixes.
* A live development server that warns about common mistakes.
* A build script to bundle JS, CSS, and images for production, with hashes.
* Non obtrusive linter with prettier.
* Aliases (@) to easily include files.


## Installation

This boilerplate requires:
[Node.js](https://nodejs.org/) v6+ and [Webpack](http://webpack.github.io/docs/).
[Yarn](https://yarnpkg.com/) is also great.

```sh
$ npm i -g webpack
```

```
$ git clone https://github.com/adrienZ/zigzag-boilerplate.git
$ cd zigzag-boilerplate
$ npm run hello
```

## Commands

```
$ npm run hello #setup
```
```
$ npm run start #dev
```
```
$ npm run build #production
```


## Features

When you follow the folder structure, it give you access to some handy aliases.
You can found them in `config/urls.js`.

Adding media has never been so easy !

In javascript:
```javascript
import myImgPath from "@img/test.jpg";
```

In sass:
```sass
.myDiv {
  background: url("~@img/test.jpg")
}
```

In html (.ejs)
```ejs
<img src="<%= require("@img/test.jpg") %>">
```

Font face
```css
@font-face {
  font-family: 'MyFont';
  src: url(~@fonts/font.ttf);
  font-weight: normal;
  font-style: normal;
}
```

## Caveats

the `htmlWebpackPlugin` does not allow HMR.
you can either :
- forget about it
- activate live reload, but lose HMR. you have to include your file in your js like this
```javascript
  import "ejs-loader!@views/index.ejs"
```

## Linters
- editorconfig : http://editorconfig.org/
- linter-sass-lint : `apm install linter-sass-lint`
- linter-eslint :
	- Atom : `apm install linter-eslint`
	- Sublime Text package : `SublimeLinter-contrib-eslint`

## TODO
- [ ] LINTERS
- [ ] easy deploy on github pages
- [ ] Sass structure

## Warning

Do not forget to edit your `package.json` before publish your repo !
