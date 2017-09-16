# ZigZag Boilerplate

This boilerplate use :
- ES6 & HTML templating (optionnal) via webpack
- sass via gulp
- linters & prettier
- npm (or yarn)

This template requires
[Node.js](https://nodejs.org/) v6+,
[Webpack](http://webpack.github.io/docs/),
and [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) to run.

```sh
$ npm i -g gulp webpack
```

### installation
```
$ git clone https://github.com/adrienZ/zigzag-boilerplate.git
$ cd zigzag-boilerplate
$ npm run hello
```

### commands

```
$ npm run build #production
```
```
$ npm run start #dev
```

### linters
- editorconfig : http://editorconfig.org/
- linter-sass-lint : `apm install linter-sass-lint`
- linter-eslint :
	- Atom : `apm install linter-eslint`
	- Sublime Text package : `SublimeLinter-contrib-eslint`

### notice
> If you have a question about the sass architecture please go to
> ./app/src/sass/style.scss

#### How do i add HTML ?
add your file(s) at the root of  `app/` and restart your server.

#### What if want to add HTML elsewhere than root ?
You shouldn't, i suggest you using a front-end router instead.

#### What files will I in `dist/` ?
- .html at the root of `app/`
- .css at the root of `app/src/sass`
- .js at the root of `app/src/js`

#### How do i import bootstrap or any CSS libraries?
- use a cdn
- add your files(s) in `app/src/sass/vendor/` as long as `npm run start` is running.
- use npm

#### What if want to add JS elsewhere than root ?
use ES6 import feature.

#### How do i import jQuery or any JS libraries?
- use a cdn
- add your files(s) in `app/src/js/vendor/` as long as `npm run start` is running.
- use npm
