<template>
  <v-navigation-drawer
    v-model="drawerVisible"
    app
    clipped
  >
    <v-subheader class="mt-4 grey--text text--darken-1">{{$t('genre.genre')}}</v-subheader>
    <v-list dense>
      <v-list-item
        v-for="item in genre"
        :key="item.text"
        link
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            {{ item.text }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link>
        <v-list-item-action>
          <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">{{$t('more')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ path: '/settings' }">
        <v-list-item-action>
          <v-icon color="grey darken-1">mdi-settings</v-icon>
        </v-list-item-action>
        <v-list-item-title class="grey--text text--darken-1">{{$t('setting')}}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'AppNavigationDrawer',
  props: ['drawer'],
  computed: {
    drawerVisible: {
      get: function () {
        return this.drawer
      },
      set: function (newValue) {
        this.$emit('update:drawer', newValue)
        return newValue
      }
    },
    genre () {
      return [
        { icon: '', text: this.$t('genre.action') },
        { icon: '', text: this.$t('genre.comedy') },
        { icon: '', text: this.$t('genre.sci-fi') },
        { icon: '', text: this.$t('genre.romance') },
        { icon: '', text: this.$t('genre.mystery') }
      ]
    }
  }
}
</script>

<style scoped>

</style>
