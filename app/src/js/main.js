import '@sass/style.scss'
import '@js/polyfills'

console.info('elle est bonne')

import ScrollManager from '@js/dom/ScrollManager'

const $sections = Array.from(document.querySelectorAll('.section'))

ScrollManager.start()

$sections.map(($s, i) => {
  if (i === 2)
    ScrollManager.watch($s, {
      callback: scroll => {
        console.log(scroll)
      },
    })
})

var p = document.querySelector('p')
p.style.setProperty('--test', '100px')

// style.getPropertyValue("--test");
console.log(p)
