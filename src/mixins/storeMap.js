import {
  mapActions,
  mapState,
  mapMutations
} from 'vuex'

export default {
  computed: mapState({
    snackCon: 'snackCon'
  }),
  methods: {
    ...mapActions({}),
    ...mapMutations({
      callSnack: 'CALL_SNACK'
    })
  }
}
