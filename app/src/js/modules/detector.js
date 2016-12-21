const browsers = {};
browsers.isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
// Firefox 1.0+
browsers.isFirefox = typeof InstallTrigger !== 'undefined';
// At least Safari 3+= "[object HTMLElementConstructor]"
browsers.isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
// Internet Explorer 6-11
browsers.isIE =/*@cc_on!@*/
false || !!document.documentMode;
// Edge 20+
browsers.isEdge = !browsers.isIE && !!window.StyleMedia;
// Chrome 1+
browsers.isChrome = !!window.chrome && !!window.chrome.webstore;
// Blink engine detection
browsers.isBlink = (browsers.isChrome || browsers.isOpera) && !!window.CSS;

export const detector = {
  isMobile: navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/),
  browsers: browsers,
};

// browserify support
if (typeof module === 'object')
  module.exports = detector;
