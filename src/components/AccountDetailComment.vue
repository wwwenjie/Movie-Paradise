<template>
  <v-page
    :title="$t('myComments')"
  >
    <comment-list
      :comments="comments"
    />
  </v-page>
</template>

<script>
import VPage from '../components/global/VPage'
import CommentList from '../components/global/CommentList'
import { getCommentByUserId } from '../api/comment'

export default {
  name: 'AccountDetailComment',
  components: {
    'v-page': VPage,
    'comment-list': CommentList
  },
  props: {
    userId: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      comments: []
    }
  },
  async mounted () {
    this.comments = await getCommentByUserId(this.userId)
  }
}
</script>

<style scoped>

</style>
