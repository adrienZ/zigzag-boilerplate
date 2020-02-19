// @babel/plugin-syntax-dynamic-import
import 'core-js/modules/es6.promise'
import 'core-js/modules/es6.array.iterator'
import 'ie11-custom-properties'

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;