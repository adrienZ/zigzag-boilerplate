# Doc

## How does your data injection works ?

Webpack aliases are defined in `webpack.urls`. They can be used in your js and your html,
they are useful for cache busting and shorten code.

```js
import '@sass/style.scss'
import '@js/polyfills'
```

```html
<h3>Title color <%= titleColor %></h3>
```

Internally those aliases are send in the sass and the html trought a relative path.
It allow us to not use `file-loader` and speed build time !

```html
    <img src="<%= $img %>/example.jpg">
```

We also have a `GLOBALS` object in `webpack/dataInjection.js` where you can send data
in the html and sass.

those data are send via the `sass-loader` and the `htmlWebpackPlugin` options.

