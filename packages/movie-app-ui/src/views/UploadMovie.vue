<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-page :title="$t('uploadMovie')">
      <div class="mx-2">
        <v-form
          ref="form"
          v-model="valid"
          class="mx-4 mt-4"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :rules="[v => !!v || 'Movie Name is required']"
            label="Movie Name (Chinese) *"
            required
          />

          <v-text-field
            v-model="name"
            label="Movie Name (English)"
          />

          <v-select
            v-model="select"
            :items="items"
            :rules="[v => !!v || 'Movie Type is required']"
            label="Movie Type *"
            required
          />

          <div class="d-flex justify-end">
            <v-btn @click="submit">
              {{ $t('submit') }}
            </v-btn>
          </div>
        </v-form>
      </div>
    </v-page>
  </v-sheet>
</template>

<script>
import VPage from '@/components/global/VPage'
export default {
  name: 'UploadMovie',
  components: {
    'v-page': VPage
  }
}
</script>

<style scoped>

</style>
