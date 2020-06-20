<template>
  <v-dialog
    max-width="500px"
    :value="userId || movieId"
    :fullscreen="$vuetify.breakpoint.xsOnly"
    @click:outside="outSide"
  >
    <v-page
      v-if="userId || movieId"
      :title="$vuetify.breakpoint.xsOnly ? title : undefined"
      :back-function="outSide"
    >
      <v-list>
        <v-list-item v-if="userId">
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
          {{ title }}
        </v-list-item>
        <comment-list
          :comments="comments"
          :show-user="movieId !== undefined"
        />
      </v-list>
    </v-page>
  </v-dialog>
</template>

<script>
import VPage from './global/VPage'
import CommentList from './global/CommentList'
import { getUserByUid } from '../api/user'
import { getCommentByMovieId, getCommentByUserId } from '../api/comment'

export default {
  name: 'MovieDetailCommentExtra',
  components: {
    'v-page': VPage,
    'comment-list': CommentList
  },
  props: {
    userId: {
      type: String,
      default: undefined
    },
    movieId: {
      type: Number,
      default: undefined
    },
    movieTitle: {
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
  computed: {
    title: function () {
      return this.userId
        ? this.$t('userComments', { userName: this.user.name })
        : this.$t('movieComments', { movieTitle: this.movieTitle })
    }
  },
  watch: {
    // todo: lazy load comments
    userId: async function (userId) {
      if (userId) {
        const handleUserPromise = getUserByUid(userId)
        const handleCommentPromise = getCommentByUserId(userId, 100)
        this.user = await handleUserPromise
        this.comments = await handleCommentPromise
      }
    },
    movieId: async function (movieId) {
      if (movieId) {
        this.comments = await getCommentByMovieId(movieId, 100)
      }
    }
  },
  methods: {
    outSide () {
      this.$emit('update:user-id', undefined)
      this.$emit('update:movie-id', undefined)
    }
  }
}
</script>

<style scoped>

</style>
