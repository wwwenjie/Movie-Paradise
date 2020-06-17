<template>
  <v-page
    :title="$t('feedback')"
  >
    <v-form
      ref="form"
      class="mx-4 mt-4"
    >
      <v-select
        v-model="category"
        :label="$t('category')"
        :items="categories"
        :rules="[v => !!v || $t('ruleRequired')]"
        required
      />

      <v-text-field
        v-model="summary"
        :label="$t('summarizeFeedback')"
        :rules="[v => !!v || $t('ruleRequired')]"
        :counter="50"
        required
      />

      <v-text-field
        v-model="detail"
        :label="$t('detailFeedback')"
      />

      <v-text-field
        v-model="email"
        :label="$t('emailFeedback')"
      />

      <div class="d-flex align-center justify-space-between">
        <span
          class="body-2 grey--text"
        >
          {{ $t('developer') }}
          <span
            class="text-decoration-underline blue-grey--text"
            @click="github"
          >
            {{ $t('githubFeedback') }}
          </span>
        </span>
        <v-btn @click="submit">
          {{ $t('submit') }}
        </v-btn>
      </div>
    </v-form>
  </v-page>
</template>

<script>
import VPage from '../components/global/VPage'
export default {
  name: 'Feedback',
  components: {
    'v-page': VPage
  },
  data () {
    return {
      category: undefined,
      summary: undefined,
      detail: undefined,
      email: undefined
    }
  },
  computed: {
    categories () {
      return [
        this.$t('bugFeedback'),
        this.$t('featureFeedback'),
        this.$t('movieFeedback')
      ]
    }
  },
  methods: {
    submit () {

    },
    github () {
      window.open('https://github.com/wwwenjie/Movie-Paradise/issues/new/choose', '_blank')
    }
  }
}
</script>

<style scoped>

</style>
