<template>
  <v-dialog
    v-model="dialog"
    max-width="390"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-list-item
        v-bind="attrs"
        v-on="on"
      >
        <v-list-item-icon>
          <v-icon color="red">
            mdi-delete-alert
          </v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ $t('deleteAccount') }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-card>
      <v-card-title class="headline">
        {{ $t('confirmDelete') }}
      </v-card-title>

      <v-card-text>
        {{ $t('confirmText') }}
        <v-text-field
          v-model="password"
          :label="$t('confirmPassword')"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          @click="dialog = false"
        >
          {{ $t('cancel') }}
        </v-btn>
        <v-btn
          color="red"
          class="white--text"
          @click="deleteAccount"
        >
          {{ $t('delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { setLoading } from '../utils'
import { deleteUser } from '../api/user'

export default {
  name: 'AccountDetailDelete',
  data () {
    return {
      dialog: false,
      password: ''
    }
  },
  methods: {
    async deleteAccount () {
      await setLoading(deleteUser(this.password))
      this.$emit('logOut')
    }
  }
}
</script>

<style scoped>

</style>
