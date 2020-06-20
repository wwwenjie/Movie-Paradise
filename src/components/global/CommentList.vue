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

          <v-list-item-subtitle>
            {{ comment.summary }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider :inset="showUser" />
    </div>
  </v-list>
</template>

<script>
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
    }
  }
}
</script>

<style scoped>

</style>
