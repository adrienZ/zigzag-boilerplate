import detector from '@jssss/modules/detector';
import DomManipulator from '@jssss/models/class.dom-manipulator';

const $ = new DomManipulator();

console.log('Elle est bonne !');
console.info(detector);
console.debug('move your ', $.el('body'));
