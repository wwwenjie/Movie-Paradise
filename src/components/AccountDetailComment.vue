<template>
  <v-page
    title="my comment"
  >
    <comment-list
      :user-id="userId"
    />
  </v-page>
</template>

<script>
import VPage from '../components/global/VPage'
import CommentList from '../components/global/CommentList'

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
  }
}
</script>

<style scoped>

</style>
