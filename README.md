# ZigZag Boilerplate

This boilerplate use :
- ES6 + import plugin via webpack
- sass via gulp
- linters
- npm & bower


This template requires [Node.js](https://nodejs.org/) v6+, [Webpack](http://webpack.github.io/docs/), [Bower](https://bower.io/#install-bower), and [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) to run .

```sh
$ npm i -g gulp
$ npm i -g bower
$ npm i -g webpack
```

### installation
```
$ npm run hello
```

### commands

```
$ gulp build # create dist files
```

```
$ gulp dev # work condition, sync server
```

```
$ gulp prod #compress css and js from dist/
```

### linters
- editorconfig : http://editorconfig.org/
- linter-sass-lint : `apm install linter-sass-lint`
- linter-eslint : 
	- Atom : `apm install linter-eslint`
	- Sublime Text package : `SublimeLinter-contrib-eslint`

```
export PKG=eslint-config-airbnb;
npm info "$PKG" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG"
```
