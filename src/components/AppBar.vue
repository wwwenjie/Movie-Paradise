<template>
  <v-app-bar
    app
    dark
    dense
    flat
    clipped-left
    color="red"
  >
    <v-app-bar-nav-icon @click.stop="onClickDrawer"/>
    <v-toolbar-title @click="goHomePage" class="pl-0">
      <v-icon large class="ml-4">mdi-youtube</v-icon>
      <span class="title">{{$t('appName')}}</span>
    </v-toolbar-title>
    <v-spacer/>
    <v-row
      align="center"
      style="max-width: 650px"
    >
      <v-autocomplete
        v-if="this.$vuetify.breakpoint.lgAndUp"
        v-model="select"
        :loading="loading"
        :items="items"
        :search-input.sync="search"
        :placeholder="$t('search')"
        prepend-inner-icon="mdi-magnify"
        hide-details
        clearable
      >
        <template slot="no-data">
          <v-list-item>Opps, can not find this movie</v-list-item>
        </template>
      </v-autocomplete>
    </v-row>
    <v-spacer/>
    <v-btn
      outlined
    >
      Login
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: ['drawer'],
  data () {
    return {
      loading: false,
      select: null,
      search: null,
      items: []
    }
  },
  watch: {
    // live search
    search () {
      this.loading = true
      setTimeout(() => {
        this.loading = false
      }, 2000)
    }
  },
  methods: {
    onClickDrawer () {
      this.$emit('update:drawer', !this.drawer)
    },
    goHomePage () {
      // handle NavigationDuplicated
      this.$router.push({ path: '/' }).catch(err => err)
    }
  }
}
</script>

<style scoped>

</style>
