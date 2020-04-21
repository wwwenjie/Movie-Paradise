export default {
  // [[md down], [md up]]
  // [['mt-6', 'ml-12'], ['mt-12']]
  // md down: mt-6 ml-12
  // md up: mt-12
  // ['', 'mt-12']
  // md down: null
  // md up: mt-12
  bind: function (el, binding, vnode) {
    const index = vnode.context.$vuetify.breakpoint.mdAndDown ? 0 : 1
    if (Array.isArray(binding.value[index])) {
      binding.value[index].map(className => {
        el.classList.add(className)
      })
    } else {
      if (binding.value[index] !== '') {
        el.classList.add(binding.value[index])
      }
    }
  }
}
