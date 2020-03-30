import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  computed: mapState({
    snackCon: 'snackCon'
  }),
  methods: {
    ...mapActions({}),
    ...mapMutations({})
  }
}
