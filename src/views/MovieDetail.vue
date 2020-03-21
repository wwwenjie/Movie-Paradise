<template>
  <v-sheet
    class="fill-height"
    style="width: 100%"
  >
    <v-app-bar
      app
      dense
      flat
      color="gery"
    >
      <span class="ma-auto">交友网站 App War</span>
      <v-btn
        fab
        fixed
        small
        text
        size="small"
        class="cancel-button"
        @click="goBack"
      >
        <v-icon>mdi-close-circle</v-icon>
      </v-btn>
    </v-app-bar>
    <v-img
      width="100%"
      max-height="50vh"
      src="../assets/test.jpg"
      alt="Movie Poster Cover"
      gradient="to bottom,rgba(64, 64, 64, 0) 60%,rgba(30, 30, 30, 100) 100%"
      class="cover"
    />
    <v-img
      v-class="{pad:'mt-4',laptop:'mt-12'}"
      width="40%"
      height="30vh"
      src="../assets/test.jpg"
      alt="Movie Poster"
      class="mx-auto"
    />
    <v-row
      no-gutters
      justify="space-around"
      class="index"
    >
      <v-col
        cols="12"
        class="text-center mt-2"
      >
        <span class="body-1 mx-2 font-weight-bold">2018</span>
        <span class="body-1 mx-2 font-weight-bold">喜剧</span>
        <span class="body-1 mx-2 font-weight-bold">115分钟</span>
      </v-col>
      <v-col
        cols="12"
        class="text-center"
      >
        <v-btn depressed width="90%" class="mt-4 red">
          <v-icon left>mdi-play</v-icon>
          预告片
        </v-btn>
      </v-col>
      <v-col
        cols="12"
      >
        <v-expansion-panels flat>
          <v-expansion-panel style="background-color: transparent !important;">
            <v-expansion-panel-header class="mt-4 py-0 text-justify body-2">
              邦和茱儿，两个App新创团队负责人；一次偶然的相遇，让他们无可自拔地爱上彼此，并发现双方拥有许多共同兴趣。这启发邦打造出崭新风格的交友App「Inviter」
            </v-expansion-panel-header>
            <v-expansion-panel-content class="text-justify body-2">
              ，让更多网友得以认识拥有相同兴趣的人。不过邦却万万没料到，拥有相同内容与风格的App「Amjoin」随后上线，人气与下载量甚至威胁到「Inviter」。而这个疑似抄袭的App，竟是来自茱儿的团队，让邦和茱儿就此成了竞争对手…。
              同时，一年一度的新创团队争霸战即将来临，甚至祭出1亿泰铢高额奖金。竞赛期间，邦和茱儿以对手身份再度碰面；双方为了获取巨额奖金，都试图派出间谍渗透到对方的研发团队。不过千算万算，两人却算不到逐渐在心中滋长的爱苗…。随着间谍计划逐渐失控，邦与茱儿在这场争霸战中谁胜谁负？在他们争面子、夺奖金的同时，两人的情愫也掀起更多波澜…。
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <v-col
        cols="12"
        class="px-6"
      >
        <span class="caption grey--text">演员: 你我他，他和她</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">mdi-plus</v-icon>
        <span class="caption grey--text">加入片库</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">mdi-download</v-icon>
        <span class="caption grey--text">下载链接</span>
      </v-col>
      <v-col
        cols="4"
        class="px-6 text-center"
      >
        <v-icon class="d-block">mdi-heart</v-icon>
        <span class="caption grey--text">加入喜欢</span>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <home-list
      genre="相关影片"
      :show-extend="this.$vuetify.breakpoint.mdAndUp"
      :flex="this.$vuetify.breakpoint.smAndUp?3:6"
    />
  </v-sheet>
</template>

<script>
import HomeList from '../components/HomeList'

export default {
  name: 'MovieDetail',
  props: ['movieId'],
  components: {
    'home-list': HomeList
  },
  methods: {
    goBack () {
      this.$router.back()
    }
  },
  mounted () {
    this.$vuetify.goTo(0)
  }
}
</script>

<style scoped>
  .index div {
    z-index: 1;
  }

  .cancel-button {
    z-index: 99;
    right: 6px;
    top: 6px;
  }

  .cover {
    position: absolute;
    filter: blur(20px);
  }
</style>
