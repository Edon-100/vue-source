import { isObject } from '../utils'
import { arrayMethods } from './arrary'

class Observer {
  constructor(data) {
    Object.defineProperty(data, '__ob__', {
      value: this,
      enumerable: false // 不可枚举的
    })
    // data.__ob__ = this
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  observeArray(data) {
    data.forEach((item) => observe(data))
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key, data[key])
    })
  }
}

function defineReactive(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newV) {
      console.log('set', data, key, value)
      observe(newV)
      value = newV
    }
  })
}

export function observe(data) {
  if (!isObject(data)) {
    return
  }
  if (data.__ob__) {
    return
  }
  return new Observer(data)
}
