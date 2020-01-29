<template>
  <v-sheet
    class="mx-auto"
    width="100vw"
  >
    <p class="title ml-4 mb-0">最新</p>
    <v-slide-group
      center-active
      v-model="model"
      class="mt-n4"
      style="overflow-y: hidden"
    >
      <v-slide-item
        v-for="n in 5"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
        <v-img
          :gradient="active ? 'to bottom,rgba(64, 64, 64, 0) 0%,rgba(64, 64, 64, 50) 100%' : undefined"
          src="../assets/movie/3.jpg"
          class="ma-4"
          height="180"
          width="130"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-img>
      </v-slide-item>
    </v-slide-group>
    <app-scroll-detail
      :model="model"
      :data="data"
    >
    </app-scroll-detail>
  </v-sheet>
</template>

<script>
import AppScrollDetail from './AppScrollDetail'

export default {
  name: 'AppScroll',
  components: {
    'app-scroll-detail': AppScrollDetail
  },
  data: function () {
    return {
      model: null,
      data: {
        translate: {
          title: this.$i18n.t('movie.translate'),
          value: this.$i18n.locale === 'zh-CN' ? null : 'Lost in Russia'
        },
        name: { title: this.$i18n.t('movie.name'), value: '囧妈' },
        date: { title: this.$i18n.t('movie.date'), value: '2020-01-25(中国大陆)' },
        origin: { title: this.$i18n.t('movie.origin'), value: '中国' },
        lan: { title: this.$i18n.t('movie.lan'), value: '普通话' },
        genre: { title: this.$i18n.t('movie.genre'), value: '剧情 / 喜剧' },
        douban_rate: { title: this.$i18n.t('movie.douban_rate'), value: '6.2/10 from 90,658 users' },
        IMDb_rate: { title: this.$i18n.t('movie.IMDb_rate'), value: '6.6/10 from 948 users' }
      }
    }
  }
}
</script>

<style scoped>

</style>
