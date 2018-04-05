![GitHub last commit](https://img.shields.io/github/last-commit/adrienz/zigzag-boilerplate.svg)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/adrienz/zigzag-boilerplate.svg)

# ZigZag Boilerplate

#### The no-framework boilerplate


## What’s Included?

* ES6, SASS and EJS syntax support.
* Autoprefixed CSS, so you don’t need `-webkit-` or other prefixes.
* A live development server that warns about common mistakes.
* Easily deploy your app to Github Pages.
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
$ curl -L -o master.zip https://github.com/adrienZ/zigzag-boilerplate/archive/master.zip && unzip master.zip && rm master.zip && mv ./zigzag-boilerplate-master/{.,}* ./ && rm -r ./zigzag-boilerplate-master
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

## Deploy

1. Run this command: `npm run deploy`
2. Make sure you have activated Github pages in your repository settings and set the `gh-pages` branch as source.
3. your app is now live at `https://{your-github-username}.github.io/{repo-name}/`


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
- activate live reload, but lose HMR. you have to include your file in your js like this:
```javascript
  import "ejs-loader!@base/index.ejs"
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
