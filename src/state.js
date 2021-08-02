import { observe } from './observer'
import { isFunction } from './utils'

export function initState(vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  
  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}

function initData(vm) {
  let data = vm.$options.data

  data = vm._data = isFunction(data) ? data.call(vm) : data

  for (let key in data) {
    proxy(vm,'_data', key) // 会把vm.xxx => vm._data.xxx
  }

  observe(data)
}

function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue
    }
  })
}
