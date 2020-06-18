import Message from '../utils/message'

export default {
  methods: {
    todo () {
      Message.info(this.$t('todo'))
    }
  }
}
