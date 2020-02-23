import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'

export default {
  computed: mapState({
    isHome: 'isHome'
  }),
  methods: {
    ...mapActions({}),
    ...mapMutations({
      setIsHome: 'SET_IS_HOME'
    })
  }

}
