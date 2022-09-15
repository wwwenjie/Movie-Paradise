<template>
  <v-page
    :title="$t('myComments')"
  >
    <comment-list
      :comments="comments"
      show-action
    />
  </v-page>
</template>

<script>
import VPage from './global/VPage'
import CommentList from './global/CommentList'
import { getCommentByUserId } from '../api/comment'

export default {
  name: 'AccountDetailComment',
  components: {
    'v-page': VPage,
    'comment-list': CommentList
  },
  data () {
    return {
      comments: []
    }
  },
  async mounted () {
    this.comments = await getCommentByUserId(this.$store.state.userStore._id)
  }
}
</script>

<style scoped>

</style>
