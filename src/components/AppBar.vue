<template>
  <v-app-bar
    app
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
      <v-text-field
        :append-icon-cb="() => {}"
        :placeholder="$t('search')"
        single-line
        append-icon="mdi-magnify"
        color="white"
        hide-details
      />
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppBar',
  props: ['drawer'],
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
