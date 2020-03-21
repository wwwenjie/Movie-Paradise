<template>
  <v-sheet
    class="mx-auto"
  >
    <p class="title ml-2 mb-0">{{genre}}</p>
    <v-slide-group
      center-active
      v-model="model"
      class="mt-n4 mx-1"
    >
      <v-slide-item
        v-for="n in 10"
        :key="n"
        v-slot:default="{ active, toggle }"
        class="mx-1"
      >
        <v-img
          :gradient="active ? 'to bottom,rgba(64, 64, 64, 0) 0%,rgba(64, 64, 64, 50) 100%' : undefined"
          :src="detail.poster"
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
    <home-scroll-detail
      :model="model"
      :detail="detail"
    />
  </v-sheet>
</template>

<script>
import HomeScrollDetail from './HomeScrollDetail'

export default {
  name: 'HomeScroll',
  components: {
    'home-scroll-detail': HomeScrollDetail
  },
  props: {
    genre: {
      type: String,
      default: 'Default'
    }
  },
  data: function () {
    return {
      model: null
    }
  },
  computed: {
    detail () {
      return {
        id: 27110296,
        imdb_id: 'tt9282616',
        info: {
          genre: '剧情 / 喜剧',
          region: '中国',
          language: '汉语普通话/贵州话'
        },
        title: '无名之辈',
        title_en: 'A Cool Fish',
        year: '2020',

        rating: {
          douban_score: '8.1',
          douban_votes: 748793,
          tags: '黑色幽默/小人物/人性/方言/喜剧/中国大陆/温情/剧情',
          imdb_score: '7.1',
          imdb_votes: 1050
        },
        poster: '/static/movie/3.jpg',
        actors: '徐峥/王传君/周一围/谭卓/章宇/杨新鸣/王佳佳/王砚辉/贾晨飞/龚蓓苾/宁浩/李乃文/岳小军/苇青/富冠铭/巴拉特·巴蒂/喜利图/张海艳/朱耕佑'
      }
    }
  }
}
</script>

<style scoped>

</style>
