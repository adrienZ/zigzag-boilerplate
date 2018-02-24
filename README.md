# ZigZag Boilerplate

#### The no-framework boilerplate

This boilerplate use :
- HTML templating (optionnal) via ejs
- sass & babel
- linters & prettier
- yarn (or npm)

This template requires
[Node.js](https://nodejs.org/) v6+ and [Webpack](http://webpack.github.io/docs/)
```sh
$ npm i -g webpack
```

### installation
```
$ git clone https://github.com/adrienZ/zigzag-boilerplate.git
$ cd zigzag-boilerplate
$ npm run init
```

### commands

```
$ npm run build #production
```
```
$ npm run start #dev
```

### drawbacks

webpack is optimized when importing images from the javascript. In our case just use relative urls as you always do.
*THERE IS ONE EXCEPTION*: img in css. In order to set an image as background you must to this:

```css
  .mydiv {
    background: url("../../src/media/your-file-path")
  }
```


### linters
- editorconfig : http://editorconfig.org/
- linter-sass-lint : `apm install linter-sass-lint`
- linter-eslint :
	- Atom : `apm install linter-eslint`
	- Sublime Text package : `SublimeLinter-contrib-eslint`

### TODO
- [ ] add alias for non code ressources
- [ ] LINTERS
- [ ] complete useless infos in package.json
- [ ] easy deploy on github pages
- [ ] use webpack devserver core ip instead of new dependecy
- [ ] Sass structure
