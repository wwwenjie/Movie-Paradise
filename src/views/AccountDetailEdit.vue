<template>
  <v-sheet
    width="100%"
    class="fill-height"
  >
    <v-toolbar>
      <v-btn
        icon
        @click="$router.back()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-toolbar-title
        class="pl-0"
      >
        {{ $t('editAccount') }}
      </v-toolbar-title>
    </v-toolbar>

    <v-row align="center">
      <v-col
        cols="12"
        lg="3"
        class="text-center"
      >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="grey"
              size="120"
              style="cursor: pointer"
              v-on="on"
              @click="$refs.image.click()"
            >
              <img
                v-if="userStore.avatar"
                :src="userStore.avatar"
                :alt="userStore.name + ' avatar'"
              >
              <span v-else>
                {{ userStore.name }}
              </span>
              <input
                ref="image"
                type="file"
                accept="image/*"
                name="image"
                class="d-none"
                @change="handleAvatar($event)"
              >
            </v-avatar>
          </template>
          <span>Change Avatar</span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-list>
          <v-list-item
            v-for="(list,index) in lists"
            :key="index"
            @click.stop="onEdit(list)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ list.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action class="flex-row">
              <span
                class="text-truncate"
                style="max-width: 200px"
              >
                {{ userStore[list.value] }}
              </span>
              <v-icon>mdi-chevron-right</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-dialog
      v-model="dialog"
      max-width="390"
    >
      <v-card>
        <v-card-title>{{ $t('edit') }} {{ card.title }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-if="card.requireCheck"
            v-model="card.currentPassword"
            clearable
            :placeholder="$t('currentPassword')"
          />
          <v-text-field
            v-model="card.value"
            clearable
            :placeholder="card.title"
          />
        </v-card-text>
        <v-card-actions class="justify-end mx-4">
          <v-btn @click="onSave">
            {{ $t('save') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-sheet>
</template>

<script>
import storeMap from '../mixins/storeMap'
import Message from '../utils/message'
import { updateUser, uploadAvatar } from '../api/user'
import { setLoading } from '../utils'

export default {
  name: 'AccountDetailEdit',
  mixins: [storeMap],
  data () {
    return {
      dialog: false,
      card: {
        title: '',
        value: '',
        update: '',
        requireCheck: false,
        currentPassword: ''
      },
      lists: [
        {
          title: this.$t('nickName'),
          value: 'name'
        }, {
          title: this.$t('desc'),
          value: 'desc'
        }, {
          title: this.$t('email'),
          value: 'email'
        }, {
          title: this.$t('password'),
          value: 'password'
        }
      ]
    }
  },
  methods: {
    onEdit (list) {
      this.card.value = this.userStore[list.value]
      this.card.title = list.title
      this.card.update = list.value
      this.card.requireCheck = list.value === 'email' || list.value === 'password'
      this.dialog = true
    },
    async onSave () {
      await setLoading(updateUser({
        [this.card.update]: this.card.value,
        currentPassword: this.card.currentPassword
      }))
      if (['email', 'password'].includes(this.card.update)) {
        this.$router.back()
        this.$router.back()
        this.clearLoginData()
        Message.success(this.$t('reLogin'))
      } else {
        this.setLoginData({
          [this.card.update]: this.card.value
        })
        Message.success()
      }
      this.dialog = false
    },
    async handleAvatar (event) {
      const file = event.target.files[0]
      const imgMaxSize = 10 * 1024 * 1024
      if (file.size > imgMaxSize) {
        Message.error(this.$t('avatarBig'))
        return
      }
      let param = new FormData()
      param.append('avatar', file, file.name)
      const url = await setLoading(uploadAvatar(param))
      this.setLoginData({
        avatar: url + '?x-oss-process=style/webp' + '&lastMod=' + new Date().getTime().toString()
      })
      Message.success()
    }
  }
}
</script>

<style scoped>

</style>
