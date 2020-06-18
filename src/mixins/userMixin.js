import { updateUser } from '../api/user'
import Message from '../utils/message'
import { deepCopy, setLoading } from '../utils'

export default {
  methods: {
    async addMovieToUser (movieId, type) {
      if (!this.$store.state.token) {
        this.$store.commit('SET_POP_ACCOUNT', true)
        return
      }
      const list = deepCopy(this.$store.state.userStore[type])
      if (list.includes(movieId)) {
        Message.info(this.$t('exist'))
        return
      }
      list.unshift(movieId)
      await setLoading(
        updateUser({
          [type]: list
        })
      )
      this.$store.commit('SET_LOGIN_DATA', {
        [type]: list
      })
      Message.success()
    }
  }
}
