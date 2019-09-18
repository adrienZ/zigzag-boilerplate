// @babel/plugin-syntax-dynamic-import
import 'core-js/modules/es6.promise'
import 'core-js/modules/es6.array.iterator'

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;