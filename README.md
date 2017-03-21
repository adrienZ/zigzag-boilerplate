# ZigZag Boilerplate

> if you have question or want to add an issue please read first the [notice](https://github.com/adrienZ/zigzag-boilerplate/blob/master/NOTICE.md)

This boilerplate use :
- ES6 & HTML templating (optionnal) via webpack
- sass via gulp
[//]: # (- linters )
- npm (or yarn) & bower


This template requires
[Node.js](https://nodejs.org/) v6+,
[Webpack](http://webpack.github.io/docs/),
[Bower](https://bower.io/#install-bower),
and [Gulp](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md) to run .

```sh
$ npm i -g gulp
$ npm i -g bower
$ npm i -g webpack
```

### installation
```
$ git clone https://github.com/adrienZ/zigzag-boilerplate.git
$ cd zigzag-boilerplate
$ npm run hello
```


### commands

```
$ npm run build #create dist folder (prod)
```
```
$ npm run server #work condition, sync server for html & js & sass
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
