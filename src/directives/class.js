export default {
  bind: function (el, binding, vnode) {
    if (vnode.context.$vuetify.breakpoint.mdAndDown) {
      el.classList.add(binding.value.pad === undefined ? '' : binding.value.pad)
    } else {
      el.classList.add(binding.value.laptop === undefined ? '' : binding.value.laptop)
    }
  }
}
