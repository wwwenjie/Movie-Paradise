import { updateUser } from '../api/user'
import Message from '../utils/message'
import { deepCopy, setLoading } from '../utils'

export default {
  computed: {
    userStore: function () {
      return this.$store.state.userStore
    }
  },
  methods: {
    async addMovieToUser (movieId, type) {
      if (!this.$store.state.token) {
        this.$store.commit('SET_POP_ACCOUNT', true)
        return
      }
      let list = deepCopy(this.$store.state.userStore[type])
      if (list.includes(movieId)) {
        list = list.filter(id => id !== movieId)
      } else {
        list.unshift(movieId)
      }
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
