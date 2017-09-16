import DomManipulator from '@js/models/class.dom-manipulator';

// import style from '@sass/style.scss';
// style

const $ = new DomManipulator();

console.log('Elle est bonne !');
console.debug('move your ', $.el('body'));
