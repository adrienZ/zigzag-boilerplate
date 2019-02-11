import '@sass/style.scss'
import '@js/polyfills'

/**
 * here is an example of asynchronious modules.
 * async imports are simple promise, it allow us to
 * reduce the size of our inital javascript bundle.
 */

const ModuleAsyncImportPromise = import(/* webpackChunkName: "ip-async-test" */ 'ip')
ModuleAsyncImportPromise.then(module => {
  console.log('async import works !', module.address(), module)
})

console.info('js goes here')
