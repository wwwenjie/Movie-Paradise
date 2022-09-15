import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  computed: mapState([
    'messageCon',
    'loading',
    'darkMode',
    'locale',
    'allowImprove',
    'genreStore',
    'popAccount',
    'token',
    'userStore'
  ]),
  methods: {
    ...mapMutations({
      callLoading: 'CALL_LOADING',
      closeLoading: 'CLOSE_LOADING',
      setDarkMode: 'SET_DARK_MODE',
      setLocate: 'SET_LOCALE',
      setAllowImprove: 'SET_ALLOW_IMPROVE',
      setGenreStore: 'SET_GENRE_STORE',
      setPopAccount: 'SET_POP_ACCOUNT',
      setLoginData: 'SET_LOGIN_DATA',
      clearLoginData: 'CLEAR_LOGIN_DATA'
    }),
    ...mapActions({})
  }
}
