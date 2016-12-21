# ZigZag Boilerplate

> If you have a question about the sass architecture please go to
> ./app/src/sass/style.scss

### How do i add HTML ?
add your file(s) at the root of  app/ and use `gulp build`.

### How do i add CSS ?
add your files(s) in app/src/sass/ as long as `gulp dev` is running.

### How do i create .css file ?
add your files(s) at the root of app/src/sass/ as long as `gulp dev` is running.

### How do i import bootstrap or any CSS libraries?
use a cdn or add your files(s) in app/src/sass/vendor/ as long as `gulp dev` is running.

### How do i add JS ?
add your files(s) in app/src/js/ as long as `gulp dev` is running. Import your files in main.js (or any entry point of the webpack config).

### How do i create .js file ?
you need to use webpack. in all the webpack configs.
```javascript
  entry: {
    // add your file like this :
    // yourFileName : yourJavascriptPath.js
    //
    // examples :
    bundle: ["./app/src/js/main.js"],
    test: ["./app/src/js/test.js"]
  },
```
you will see your file in `app/dist/js/yourFileName.js`

### How do i import jQuery or any JS libraries?
if possible, use bower :
`$ bower install jquery —save`
or add your files(s) in app/src/vendor/ and use `gulp build`
