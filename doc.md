# Documentation

  * [My site must be compatible with IE, what can I do ?](#my-site-must-be-compatible-with-ie--what-can-i-do--)
  * [How does your data injection works ?](#how-does-your-data-injection-works--)
  * [Local server](#local-server)
  * [Async Modules](#async-modules)

## My site must be compatible with IE, what can I do ?

[browserslist](https://github.com/browserslist/browserslist) take care of that matter. You can find it in `package.json`.
You can test your query on this website: [browserl.ist](https://browserl.ist/?q=cover+99.5%25%2C+not+dead)

example:
```
...
  "browserslist": ["cover 99.5%, not dead"],
...
```

Autoprefixer and Babel will use this query make sure your website is compatible.

## How does your data injection works ?

You can use webpack aliases in your JS and HTML (.ejs is powered by node.js).

Webpack aliases are defined in `webpack/urls.js`.

```javascript
import '$sass/style.scss'
import '$js/polyfills'
```

```html
<h3>Title color <%= titleColor %></h3>
```

We also have a `globals` property in `zigzag.config.js` where you can send data in your HTML, SCSS and JS.

In scss we use these globals, to override some aliases as relative paths.

It allow us to not use `file-loader` and reduce build time !

```ejs
<img src="<%= $img %>/example.jpg">
```

```scss
#testImg {
  background: url(#{$img}/example.jpg);
}
```

Those datas are sent via the `sass-loader` and the `htmlWebpackPlugin` options.

## Local server

Use your local server with the following command:

```
npm run start
````

It will trigger the `webpack-dev-server`.
Your server options are located int the `devServer` property in `zigzag.config.js`

```javascript
devServer: {
  port: 8899,
  isHttps: false,
  hmr: true,
  useBroswerSync: true,
  // can't touch this
  ip: ip.address(),
}
```

As you can see, we use `BroswerSync` by default on top of the server. It allows us to use his nice debugging features, you can still disabled it by turning `useBroswerSync` to `false`.


## Async Modules

Imagine you want to load a big module of javascript... but you only need it for a specific task.
Instead of including it in your bundle and increase load time... load it later !

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
 * see more: https://webpack.js.org/api/module-methods/#magic-comments
 */

const ModuleAsyncImportPromise = import(
    /* webpackChunkName: "src/js/ip-async-test" */ 'ip'
)
ModuleAsyncImportPromise.then(module => {
  console.log('async import works !', module.address(), module)
})
```