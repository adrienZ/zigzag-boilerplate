# Documentation

## My site must be compatible with IE, what can I do ?

[browserslist](https://github.com/browserslist/browserslist) is included in [@babel/preset-env](https://babeljs.io/docs/en/babel-preset-env).
In this boilerplate, you can change the `compatibility` variable in `webpack/config.js`.

## How does your data injection works ?

Webpack aliases are defined in `webpack/urls.js`. They can be used in your js and your html,
they are useful for cache busting and shorten code.

```javascript
import '$sass/style.scss'
import '$js/polyfills'
```

```html
<h3>Title color <%= titleColor %></h3>
```

Internally those aliases are send in the sass and the html through a relative path.
It allow us to not use `file-loader` and reduce build time !

```ejs
<img src="<%= $img %>/example.jpg">
```

We also have a `GLOBALS` object in `webpack/dataInjection.js` where you can send data
in the html and sass.

those data are send via the `sass-loader` and the `htmlWebpackPlugin` options.

## Async Modules

Imagine you want to load a big module of javascript... but you only need it for a specific task.
Instead of including it in your bundle and increase load time... load it later !

in your babel configuration (`webpack/loaders.js`, see babel-loader) we desactivate modules and use the `syntax-dynamic-import` plugin.

```javascript
/**
 * ASYNC MODULES
 *
 * here is an example of asynchronious modules.
 * async imports are simple promise, it allow us to
 * reduce the size of our inital javascript bundle.
 *
 * arugments: webpackPrefetch(bool), webpackPreload(bool), webpackChunkName(string)
 *
 * see more: https://webpack.js.org/guides/code-splitting/
 */

const ModuleAsyncImportPromise = import(
  /* webpackChunkName: "ip-async-test" */ 'ip'
)
ModuleAsyncImportPromise.then(module => {
  console.log('async import works !', module.address(), module)
})
```