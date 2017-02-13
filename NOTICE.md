# ZigZag Boilerplate

> If you have a question about the sass architecture please go to
> ./app/src/sass/style.scss

### How do i add HTML ?
add your file(s) at the root of  app/ and relaunch your server.

### What if want to add HTML elsewhere than root ?
Your shouldn't, i suggest you using a front-end router instead.

### How do i add CSS ?
add your files(s) in app/src/sass/ as long as `npm run watchSass` is running.

### How do i create .css file in dist/ ?
add your files(s) at the root of app/src/sass/ as long as `npm run watchSass` is running.

### How do i import bootstrap or any CSS libraries?
use a cdn or add your files(s) in app/src/sass/vendor/ as long as `npm run watchSass` is running.

### How do i add JS ?
add your files(s) in app/src/js/ as long as `npm run server` is running.

### How do i create .js file in dist/ ?
add your file(s) at the root of  app/src/js and relaunch your server.

### What if want to add JS elsewhere than root ?
use ES6 import feature.

### How do i import jQuery or any JS libraries?
if possible, use bower :
`$ bower install jquery —save`
or add your files(s) in app/src/js/vendor/ and use `npm run build`
