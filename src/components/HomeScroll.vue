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
import AppScrollDetail from './HomeScrollDetail'

export default {
  name: 'HomeScroll',
  components: {
    'app-scroll-detail': AppScrollDetail
  },
  data: function () {
    return {
      model: null
    }
  },
  computed: {
    data () {
      return {
        name: { title: this.$t('movie.name'), value: this.$i18n.locale === 'zh-CN' ? '囧妈' : 'Lost in Russia' },
        date: { title: this.$t('movie.date'), value: '2020' },
        genre: { title: this.$t('movie.genre'), value: '剧情 / 喜剧' },
        origin: { title: this.$t('movie.origin'), value: '中国' },
        rate: [{ title: this.$t('movie.douban'), value: '6.7' }, {
          title: this.$t('movie.IMDb'),
          value: '7.4'
        }]
      }
    }
  }
}
</script>

<style scoped>

</style>
