<template>
  <v-page
    :title="$t('account')"
  >
    <v-list>
      <v-list-item
        @click="goEdit"
      >
        <v-list-item-avatar color="grey">
          <img
            v-if="userStore.avatar"
            :src="userStore.avatar"
            :alt="userStore.name + ' avatar'"
          >
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ userStore.name }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ userStore.desc }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-list-item
        v-for="(list,index) in lists"
        :key="index"
        @click="switchMethod(list.method)"
      >
        <v-list-item-icon>
          <v-icon>{{ list.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ list.text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-page>
</template>

<script>
import VPage from '../components/global/VPage'
import storeMap from '../mixins/storeMap'
import Message from '../utils/message'

export default {
  name: 'AccountDetail',
  components: {
    'v-page': VPage
  },
  mixins: [storeMap],
  data () {
    return {
      lists: [
        {
          text: this.$t('myComments'),
          icon: 'mdi-comment-text-multiple ',
          method: 'goComment'
        },
        {
          text: this.$t('myList'),
          icon: 'mdi-view-list',
          method: 'todo'
        }, {
          text: this.$t('myLike'),
          icon: 'mdi-heart',
          method: 'todo'
        }, {
          text: this.$t('watched'),
          icon: 'mdi-movie-filter',
          method: 'todo'
        }, {
          text: this.$t('logout'),
          icon: 'mdi-logout',
          method: 'logOut'
        }, {
          text: this.$t('deleteAccount'),
          icon: 'mdi-delete-alert',
          method: 'todo'
        }
      ]
    }
  },
  methods: {
    switchMethod (method) {
      this[method]()
    },
    logOut () {
      this.clearLoginData()
      Message.success()
      this.$router.back()
    },
    goEdit () {
      this.$router.push({ path: '/account/edit', query: { userId: this.userStore._id } })
    },
    goComment () {
      this.$router.push({ path: '/account/comment', query: { userId: this.userStore._id } })
    },
    todo () {
      Message.info(this.$t('todo'))
    }
  }
}
</script>

<style scoped>

</style>
