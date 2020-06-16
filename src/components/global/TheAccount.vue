<template>
  <v-dialog
    v-if="popAccount"
    v-model="popAccount"
    persistent
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="500px"
  >
    <v-card>
      <v-tabs
        fixed-tabs
        background-color="red"
        :color="darkMode ? 'white' : 'blue darken-1'"
      >
        <v-tab
          ref="login"
          class="white--text"
          @click="loginMode = true"
        >
          {{ $t('login') }}
        </v-tab>
        <v-tab
          class="white--text"
          @click="loginMode = false"
        >
          {{ $t('register') }}
        </v-tab>
      </v-tabs>
      <v-card-title>
        {{ loginMode ? $t('loginText') : $t('registerText') }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form v-model="valid">
            <v-text-field
              v-if="!loginMode"
              v-model="user.name"
              :label="$t('nickName')"
              :rules="[rules.required]"
              counter
              maxlength="25"
            />
            <v-text-field
              v-model="user.email"
              validate-on-blur
              :label="$t('email')"
              :rules="[rules.required, rules.email]"
            />
            <v-text-field
              v-model="user.password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showPassword ? 'text' : 'password'"
              :label="$t('password')"
              :validate-on-blur="loginMode"
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              v-if="!loginMode"
              v-model="confirmPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min, rules.same]"
              :type="showPassword ? 'text' : 'password'"
              :label="$t('confirmPassword')"
              @click:append="showPassword = !showPassword"
            />
            <v-combobox
              v-if="!loginMode"
              v-model="user.interests"
              :items="genreStore.map(genre=>{
                return locale === 'zh-CN' ? genre.name : genre.name_en
              }).slice(0,20)"
              :label="$t('interests')"
              :hint="$t('optional')"
              persistent-hint
              disable-lookup
              chips
              multiple
            />
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions class="mx-6">
        <v-btn
          color="blue darken-1"
          large
          class="white--text"
          @click="setPopAccount(false)"
        >
          {{ $t('close') }}
        </v-btn>
        <v-spacer />
        <v-btn
          color="blue darken-1"
          large
          class="white--text"
          @click="onSubmit"
        >
          {{ loginMode ? $t('login') : $t('register') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import storeMap from '../../mixins/storeMap'
import { login, register } from '../../api/user'
import Message from '../../utils/message'
import { setLoading } from '../../utils'

export default {
  name: 'TheAccount',
  mixins: [storeMap],
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        interests: ''
      },
      valid: false,
      confirmPassword: '',
      loginMode: true,
      showPassword: false,
      index: 0,
      rules: {
        required: value => !!value || this.$t('ruleRequired'),
        min: value => value.length >= 8 || this.$t('ruleMin'),
        email: () => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(this.user.email) || this.$t('ruleEmail')
        },
        same: value => value === this.user.password || this.$t('ruleSame')
      }
    }
  },
  methods: {
    async onSubmit () {
      if (!this.valid) {
        Message.error(this.$t('validFail'))
        return
      }
      if (this.loginMode) {
        const res = await setLoading(login(this.user))
        this.setLoginData(res)
        Message.success()
        setTimeout(() => {
          this.setPopAccount(false)
        }, 500)
      } else {
        await register(this.user)
        Message.success()
        setTimeout(() => {
          this.$refs.login.$el.click()
        }, 1000)
      }
    }
  }
}
</script>

<style scoped>

</style>
