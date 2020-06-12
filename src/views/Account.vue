<template>
  <v-dialog
    v-model="dialog"
    persistent
    :fullscreen="$vuetify.breakpoint.xsOnly"
    max-width="600px"
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
          <v-row>
            <v-col
              v-show="!loginMode"
              cols="12"
            >
              <v-text-field
                v-model="user.name"
                :label="$t('nickName')"
                :rules="[rules.required]"
                counter
                maxlength="25"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="user.email"
                validate-on-blur
                :label="$t('email')"
                :rules="[rules.required, rules.email]"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <v-text-field
                v-model="user.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min]"
                :type="showPassword ? 'text' : 'password'"
                :label="$t('password')"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col
              v-show="!loginMode"
              cols="12"
            >
              <v-text-field
                v-model="confirmPassword"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required, rules.min, rules.same]"
                :type="showPassword ? 'text' : 'password'"
                :label="$t('confirmPassword')"
                @click:append="showPassword = !showPassword"
              />
            </v-col>
            <v-col
              v-show="!loginMode"
              cols="12"
            >
              <v-autocomplete
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
            </v-col>
          </v-row>
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
import storeMap from '../mixins/storeMap'
import { login, register } from '../api/user'
import Message from '../utils/message'
import { setLoading } from '../utils'

export default {
  name: 'Account',
  mixins: [storeMap],
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: '',
        interests: undefined
      },
      confirmPassword: '',
      loginMode: true,
      showPassword: false,
      rules: {
        required: value => !!value || this.$t('ruleRequired'),
        min: value => value.length >= 8 || this.$t('ruleMin'),
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || this.$t('ruleEmail')
        },
        same: value => value === this.user.password || this.$t('ruleSame')
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.loginMode) {
        const res = await setLoading(login(this.user))
        this.setLoginData(res)
        Message.info('Success')
        setTimeout(() => {
          this.setPopAccount(false)
        }, 500)
      } else {
        if (this.confirmPassword === this.user.password) {
          await register(this.user)
          Message.info('Success')
          setTimeout(() => {
            this.$refs.login.$el.click()
          }, 1000)
        } else {
          Message.error('Password must be the same')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
