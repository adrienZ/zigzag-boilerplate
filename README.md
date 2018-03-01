# ZigZag Boilerplate

#### The no-framework boilerplate

This boilerplate use :
- HTML templating (optional) via ejs
- sass & babel
- es lint & prettier
- yarn (or npm)
- webpack

This boilerplate requires:
[Node.js](https://nodejs.org/) v6+ and [Webpack](http://webpack.github.io/docs/). [Yarn](https://yarnpkg.com/
) is also great.

```sh
$ npm i -g webpack
```

### Installation
```
$ git clone https://github.com/adrienZ/zigzag-boilerplate.git
$ cd zigzag-boilerplate
$ npm run hello
```

### Commands

```
$ npm run hello #setup
```
```
$ npm run build #production
```
```
$ npm run start #dev
```

### Features

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

### Linters
- editorconfig : http://editorconfig.org/
- linter-sass-lint : `apm install linter-sass-lint`
- linter-eslint :
	- Atom : `apm install linter-eslint`
	- Sublime Text package : `SublimeLinter-contrib-eslint`

### TODO
- [ ] LINTERS
- [ ] complete useless infos in package.json
- [ ] easy deploy on github pages
- [ ] use webpack devserver core ip instead of new dependecy
- [ ] Sass structure
