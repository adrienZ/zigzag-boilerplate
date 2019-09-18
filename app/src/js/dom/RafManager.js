// private props
let INSTANCE = null

class RafManager {
  constructor() {
    this.update = this.update.bind(this)

    // time
    this.now = Date.now()
    this.time = this.now
    this.deltaTime = 0

    this.watchers = []
    this.raf = null
  }

  static start() {
    if (!INSTANCE) {
      INSTANCE = new RafManager()
      INSTANCE.update()
    }
  }

  static stop() {
    window.cancelAnimationFrame(INSTANCE.raf)
  }

  update() {
    // time
    this.now = Date.now()
    this.deltaTime = this.now - this.time
    this.time = this.now

    for (let i = 0; i < this.watchers.length; i++)
      this.watchers[i].fn(this.deltaTime)

    this.raf = window.requestAnimationFrame(this.update)
  }

  static on(id, fn) {
    // id type check
    if (typeof id !== 'string') {
      console.error('RafManager :: Bind :: Invalid ID', id)
      return
    }

    // fn type check
    if (typeof fn !== 'function') {
      console.error('RafManager :: Bind :: Invalid Function', fn)
      return
    }

    // use id check
    for (let i = 0; i < INSTANCE.watchers.length; i++) {
      const b = INSTANCE.watchers[i]

      if (b.id === id) {
        console.warn('RafManager :: Bind :: ID already used !', id)
        return
      }
    }

    INSTANCE.watchers.push({ id, fn })
  }

  static off(id) {
    for (let i = 0; i < this.watchers.length; i++) {
      if (id === INSTANCE.watchers[i].id) {
        INSTANCE.watchers.splice(i, 1)
        break
      }
    }
  }

  static debug() {
    return INSTANCE
  }
}

export default RafManager
