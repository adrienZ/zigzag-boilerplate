import DomManipulator from "@js/models/class.dom-manipulator";

import style from "@sass/other.scss";

const $ = new DomManipulator();

console.log("Elle est bonnee !", style);
console.debug("move your ", $.el("body"));
