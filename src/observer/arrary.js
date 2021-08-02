const oldArrayPrototype = Array.prototype
export const arrayMethods = Object.create(oldArrayPrototype)

const methods = ['push', 'shift', 'unshift', 'pop', 'reverse', 'sort', 'splice']

methods.forEach((method) => {
  arrayMethods[method] = function (...args) {
    oldArrayPrototype[method].call(this, ...args)
    let inserted
    let ob = this.__ob__ // 根据当前数组获取到observer实例
    switch (method) {
      case 'push':
      case 'unshift':
				console.log('push, unshift')
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
      default:
        breakwwww
    }

    if (inserted) ob.observeArray(inserted)
  }
})
