<template>
  <!--for pad and down only-->
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-text-field
      ref="input"
      label="Search"
      prepend-inner-icon="mdi-magnify"
      class="pa-2"
      clearable
      outlined
      dense
      loading
      @focus="onFocus"
      @change="search"
    >
      <template v-slot:progress>
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          class="mt-n1"
          absolute
          rounded
        ></v-progress-linear>
      </template>
    </v-text-field>
  </v-sheet>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      loading: false
    }
  },
  methods: {
    onFocus () {
      this.loading = false
    },
    search () {
      this.$refs.input.blur()
      this.loading = true
      // searching
    }
  }
}
</script>

<style scoped>

</style>
