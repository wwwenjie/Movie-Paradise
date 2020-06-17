<template>
  <v-dialog
    max-width="500px"
    :value="userId"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    @click:outside="outSide"
  >
    <v-page
      :title="$vuetify.breakpoint.xsOnly ? $t('allComments') : undefined"
      :back-function="outSide"
    >
      <v-list>
        <v-list-item>
          <v-list-item-avatar color="grey">
            <img
              v-if="user.avatar"
              :src="user.avatar"
              :alt="user.name + ' avatar'"
            >
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline">
              {{ user.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.desc }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="hidden-xs-only">
          {{ $t('allComments') }}
        </v-list-item>
        <v-list-item>
          <comment-list :comments="comments" />
        </v-list-item>
      </v-list>
    </v-page>
  </v-dialog>
</template>

<script>
import VPage from './global/VPage'
import CommentList from './global/CommentList'
import { getUserByUid } from '../api/user'
import { getCommentByUserId } from '../api/comment'

export default {
  name: 'MovieDetailCommentUser',
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
      user: {},
      comments: []
    }
  },
  watch: {
    userId: async function (userId) {
      if (userId) {
        const handleUserPromise = getUserByUid(userId)
        const handleCommentPromise = getCommentByUserId(userId)
        this.user = await handleUserPromise
        this.comments = await handleCommentPromise
      }
    }
  },
  methods: {
    outSide () {
      this.$emit('update:user-id', undefined)
    }
  }
}
</script>

<style scoped>

</style>
