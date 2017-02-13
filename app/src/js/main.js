import detector from './modules/detector';
import DomManipulator from './models/class.dom-manipulator';

const $ = new DomManipulator();

console.log('let\'s code !', detector);
console.debug('move your ', $.el('body'));
