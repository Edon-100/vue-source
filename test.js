var a = [1, 2, 3]

a.forEach((key, index) => {
  Object.defineProperty(a, index, {
    get() {
      return a[index]
    },
    set(newVal) {
      a[index] = newVal
    }
  })
})
