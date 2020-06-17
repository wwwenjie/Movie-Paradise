<template>
  <v-card
    tile
    flat
  >
    <v-list
      v-intersect="onComments"
      three-line
      class="mx-0 mx-sm-8"
    >
      <v-subheader class="justify-space-between">
        {{ $t('comments') }}
        <v-btn
          x-small
          outlined
          @click="todo"
        >
          {{ $t('moreComments') }}
        </v-btn>
      </v-subheader>
      <p
        v-if="comments.length===0"
        class="px-4 mb-0"
      >
        {{ $t('noComments') }}
      </p>
      <div
        v-for="(comment,index) in comments"
        :key="comment.id"
      >
        <v-list-item>
          <v-list-item-avatar>
            <v-avatar
              color="grey"
              style="cursor:pointer"
              @click="userDetail(index)"
            >
              <img
                v-if="comment.user_avatar"
                :src="comment.user_avatar"
                :alt="comment.user_name + ' avatar'"
              >
            </v-avatar>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title
              class="d-flex align-center justify-space-between"
            >
              {{ comment.user_name }}
              <v-rating
                :value="comment.rating"
                small
                readonly
                color="yellow darken-3"
                background-color="grey darken-1"
              />
            </v-list-item-title>

            <v-list-item-subtitle>
              {{ comment.summary }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider inset />
      </div>
      <v-dialog
        max-width="450px"
      >
        <template v-slot:activator="{on,attrs}">
          <v-fab-transition>
            <v-btn
              v-show="showBtn"
              ref="button"
              fab
              fixed
              bottom
              right
              class="mb-12 mb-lg-0 mb-xl-0"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-fab-transition>
        </template>
        <v-card>
          <v-card-title>{{ $t('createComment') }}</v-card-title>
          <v-card-text class="pb-0">
            <v-rating
              v-model="rating"
              color="yellow darken-3"
              background-color="grey darken-1"
            />
            <v-textarea
              v-model="summary"
              rows="3"
              counter="150"
              solo
              clearable
              :label="$t('howDoYouThink')"
              class="mt-4"
            />
          </v-card-text>
          <v-card-actions class="justify-end mx-4">
            <v-btn @click="saveComment">
              {{ $t('save') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <comment-user
        :user-id.sync="userId"
      />
    </v-list>
  </v-card>
</template>

<script>
import MovieDetailCommentUser from './MovieDetailCommentUser'
import { createComment, getCommentByMovieId } from '../api/comment'
import Message from '../utils/message'
import { isSafari, setLoading, undefinedMovie } from '../utils'
import storeMap from '../mixins/storeMap'

export default {
  name: 'MovieDetailComment',
  components: {
    'comment-user': MovieDetailCommentUser
  },
  mixins: [storeMap],
  props: {
    showBtn: {
      type: Boolean,
      default: false
    },
    movie: {
      type: Object,
      default: () => undefinedMovie()
    }
  },
  data () {
    return {
      comments: [{
        user_name: undefined,
        user_avatar: undefined,
        summary: undefined,
        rating: undefined
      }],
      rating: undefined,
      summary: undefined,
      userId: undefined
    }
  },
  watch: {
    movie: async function (movie) {
      this.comments = await getCommentByMovieId(movie._id)
      this.comments.forEach(comment => {
        if (comment.user_avatar) {
          comment.user_avatar += '?x-oss-process=style/'
          comment.user_avatar += isSafari() ? 'comment_safari' : 'comment'
        }
      })
    }
  },
  methods: {
    onComments (entries) {
      this.$emit('update:showBtn', entries[0].isIntersecting)
    },
    async saveComment () {
      if (!this.token) {
        Message.info(this.$t('loginFirst'))
        this.setPopAccount(true)
        return
      }
      const comment = {
        user_id: this.userStore._id,
        user_name: this.userStore.name,
        // remove lastMod
        user_avatar: this.userStore.avatar.split('?').shift(),
        movie_id: this.movie._id,
        movie_title: this.movie.title,
        movie_title_en: this.movie.title_en,
        rating: this.rating,
        summary: this.summary
      }
      await setLoading(createComment(comment))
      Message.success()
      this.comments.unshift(comment)
      this.$refs.button.$el.click()
    },
    userDetail (index) {
      this.userId = this.comments[index].user_id
      console.log(this.userId)
    },
    todo () {
      Message.info(this.$t('todo'))
    }
  }
}
</script>

<style scoped>

</style>
