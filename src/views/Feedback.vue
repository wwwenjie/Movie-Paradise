<template>
  <v-page
    :title="$t('feedback')"
  >
    <v-form
      ref="form"
      class="mx-4 mt-4"
    >
      <v-select
        v-model="feedback.category"
        :label="$t('category')"
        :items="categories"
        :rules="[v => !!v || $t('ruleRequired')]"
        required
      />

      <v-text-field
        v-model="feedback.summary"
        :label="$t('summarizeFeedback')"
        :rules="[v => !!v || $t('ruleRequired')]"
        :counter="50"
        required
      />

      <v-text-field
        v-model="feedback.detail"
        :label="$t('detailFeedback')"
      />

      <v-text-field
        v-model="feedback.email"
        :label="$t('emailFeedback')"
      />

      <div class="d-flex align-center justify-space-between">
        <span
          class="body-2 grey--text"
        >
          {{ $t('developer') }}
          <a
            class="text-decoration-underline blue-grey--text"
            @click="github"
          >
            {{ $t('githubFeedback') }}
          </a>
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
import { addFeedback } from '../api/feedback'
import Message from '../utils/message'
export default {
  name: 'Feedback',
  components: {
    'v-page': VPage
  },
  data () {
    return {
      feedback: {
        category: undefined,
        summary: undefined,
        detail: undefined,
        email: undefined
      }
    }
  },
  computed: {
    categories () {
      return [
        this.$t('bugFeedback'),
        this.$t('featureFeedback'),
        this.$t('movieErrorFeedback'),
        this.$t('movieNotFoundFeedback')
      ]
    }
  },
  methods: {
    async submit () {
      await addFeedback(this.feedback)
      Message.success()
    },
    github () {
      window.open('https://github.com/wwwenjie/Movie-Paradise/issues/new/choose', '_blank')
    }
  }
}
</script>

<style scoped>

</style>
