import '@sass/style.scss'
import '@js/polyfills'

console.info('elle est bonne')

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

const ModuleAsyncImportPromise = import(/* webpackChunkName: "ip-async-test" */ 'ip')
ModuleAsyncImportPromise.then(module => {
  console.log('async import works !', module.address(), module)
})
