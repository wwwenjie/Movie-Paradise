import { updateUser } from '../api/user'
import Message from '../utils/message'
import { setLoading } from '../utils'

export default {
  methods: {
    async addMovieToUser (movieId, type) {
      const list = this.$store.state.userStore[type]
      if (list.includes(movieId)) {
        Message.info(this.$t('exist'))
        return
      }
      await setLoading(
        updateUser({
          [type]: list.concat(movieId)
        })
      )
      this.$store.commit('SET_LOGIN_DATA', {
        [type]: list.concat(movieId)
      })
      Message.success()
    }
  }
}
