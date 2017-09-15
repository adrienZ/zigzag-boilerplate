import DomManipulator from '@js/models/class.dom-manipulator';

const $ = new DomManipulator();

console.log('Elle est bonne !');
console.debug('move your ', $.el('body'));
