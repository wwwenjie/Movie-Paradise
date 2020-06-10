import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  computed: mapState([
    'snackCon',
    'darkMode',
    'locale',
    'allowImprove',
    'genreStore',
    'popAccount',
    'uid',
    'token',
    'userName'
  ]),
  methods: {
    ...mapMutations({
      setDarkMode: 'SET_DARK_MODE',
      setLocate: 'SET_LOCALE',
      setAllowImprove: 'SET_ALLOW_IMPROVE',
      setGenreStore: 'SET_GENRE_STORE',
      setPopAccount: 'SET_POP_ACCOUNT',
      setLoginData: 'SET_LOGIN_DATA'
    }),
    ...mapActions({})
  }
}
