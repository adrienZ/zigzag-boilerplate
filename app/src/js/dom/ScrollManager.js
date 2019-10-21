import RafManager from '@js/dom/RafManager'

let INSTANCE = null

class ScrollManager {
  constructor(options = {}) {
    this.onResize = this.onResize.bind(this)
    this.update = this.update.bind(this)

    this.options = options

    this.items = []
  }

  static start(options) {
    if (!INSTANCE) {
      INSTANCE = new ScrollManager(options)

      if (INSTANCE.options.raf) {
        RafManager.start()
        RafManager.on('ScrollManager', INSTANCE.update)
      } else {
        window.addEventListener('scroll', INSTANCE.update, false)
      }

      window.addEventListener('resize', INSTANCE.onResize)
    }
  }

  static watch($node = document.body, options) {
    const item = new ScrollItem($node, options)
    INSTANCE.items.push(item)
    INSTANCE.onResize()

    return item
  }

  update() {
    const { screen } = this

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].update(screen)
    }
  }

  onResize() {
    this.screen = {
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    }

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].cache()
    }
  }

  static debug() {
    return INSTANCE
  }
}


class ScrollItem {
  constructor($el, options = {}) {
    Object.assign(this, {
      $el,
      callback: options.callback || null,
      props: {},
    })
  }

  setCallback(callback) {
    this.callback = callback
  }

  cache() {
    const { $el } = this
    const style = window.getComputedStyle($el, null)

    const boundings = $el.getBoundingClientRect()

    // const marginTop = parseInt(style.getPropertyValue('margin-top'))
    const offsetTop = boundings.top + window.pageYOffset

    const height = $el.offsetHeight
    const width = $el.offsetWidth

    this.props = {
      offsetTop,
      style,
      height,
      width,
    }
  }

  update(screen) {
    const { props } = this

    const pageY = window.pageYOffset
    const reached = -(props.offsetTop - pageY - screen.height)
    const hidden = props.height - reached
    const remaining = hidden + screen.height
    const center = (screen.height - props.height - 1) / 2 + hidden

    if (reached > 0 && remaining > 0) {
      typeof this.callback === 'function' &&
        this.callback({ pageY, reached, hidden, remaining, center })
    }
  }
}

export default ScrollManager
