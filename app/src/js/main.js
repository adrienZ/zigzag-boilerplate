import detector from './modules/detector';
import DomManipulator from './models/class.dom-manipulator';

const $ = new DomManipulator();

console.log('Elle est bonne !');
console.info(detector);
console.debug('move your ', $.el('body'));
