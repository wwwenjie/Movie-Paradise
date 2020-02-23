<template>
  <v-app-bar
    app
    dense
    flat
    clipped-left
    :hide-on-scroll="this.$vuetify.breakpoint.xsOnly"
    :color="this.$vuetify.breakpoint.mdAndDown?'transparent':'red'"
  >
    <v-app-bar-nav-icon @click.stop="onClickDrawer"/>
    <v-icon class="mx-4 hidden-xs-only">mdi-youtube</v-icon>
    <v-toolbar-title class="mr-12 align-center">
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
    }
  }
}
</script>

<style scoped>

</style>
