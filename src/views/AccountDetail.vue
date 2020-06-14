<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-toolbar>
      <v-btn
        icon
        @click="$router.back()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title
        class="pl-0"
      >
        {{ $t('account') }}
      </v-toolbar-title>
    </v-toolbar>
    <v-list>
      <v-list-item
        @click="$router.push({ path: '/account/edit' })"
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
  </v-sheet>
</template>

<script>
import storeMap from '../mixins/storeMap'
import Message from '../utils/message'

export default {
  name: 'AccountDetail',
  mixins: [storeMap],
  data () {
    return {
      lists: [
        {
          text: this.$t('myComments'),
          icon: 'mdi-comment-text-multiple ',
          method: 'todo'
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
    todo () {
      Message.info(this.$t('todo'))
    }
  }
}
</script>

<style scoped>

</style>
