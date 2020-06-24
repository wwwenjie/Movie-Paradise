<template>
  <v-list
    width="100%"
    three-line
  >
    <p
      v-if="comments.length===0"
      class="px-4 mb-0"
    >
      {{ $t('noComments') }}
    </p>
    <div
      v-for="comment in comments"
      :key="comment.id"
    >
      <v-list-item>
        <v-list-item-avatar
          v-if="showUser"
        >
          <v-avatar
            color="grey"
            style="cursor:pointer"
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
            {{ showUser ? comment.user_name : comment.movie_title }}
            <v-rating
              :value="comment.rating"
              small
              readonly
              color="yellow darken-3"
              background-color="grey darken-1"
            />
          </v-list-item-title>

          <v-list-item-subtitle
            class="d-flex align-center justify-space-between"
          >
            {{ comment.summary }}
            <div v-if="showAction">
              <v-btn
                outlined
                small
                class="mr-2"
                @click="onEditClick(comment)"
              >
                {{ $t('edit') }}
              </v-btn>
              <v-btn
                outlined
                small
                color="error"
                @click="deleteComment(comment._id)"
              >
                {{ $t('delete') }}
              </v-btn>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider :inset="showUser" />
    </div>
    <v-dialog
      v-if="showAction"
      v-model="dialog"
      max-width="450px"
    >
      <v-card>
        <v-card-title>{{ $t('editComment') }} - {{ comment.movie_title }}</v-card-title>
        <v-card-text class="pb-0">
          <v-rating
            v-model="comment.rating"
            color="yellow darken-3"
            background-color="grey darken-1"
          />
          <v-textarea
            v-model="comment.summary"
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
  </v-list>
</template>

<script>
import { setLoading } from '@/utils'
import { deleteComment, updateComment } from '@/api/comment'
import Message from '@/utils/message'

export default {
  name: 'CommentList',
  props: {
    comments: {
      type: Array,
      default: () => []
    },
    // show user name and avatar, hide movie name
    showUser: {
      type: Boolean,
      default: false
    },
    showAction: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      comment: {
        _id: undefined,
        rating: undefined,
        summary: undefined
      }
    }
  },
  methods: {
    onEditClick (comment) {
      this.dialog = true
      this.comment = comment
    },
    async saveComment () {
      await setLoading(updateComment({
        _id: this.comment._id,
        rating: this.comment.rating,
        summary: this.comment.summary
      }))
      Message.success()
      this.dialog = false
    },
    async deleteComment (commentId) {
      await setLoading(deleteComment(commentId))
      Message.success()
      // warn: changed props
      this.comments.forEach((comment, index) => {
        if (comment._id === commentId) {
          this.$delete(this.comments, index)
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
