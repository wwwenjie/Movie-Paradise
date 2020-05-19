<template>
  <v-dialog
    v-model="isShow"
    max-width="920"
  >
    <v-card>
      <v-card-title class="headline">
        {{ trailer.name }}
      </v-card-title>

      <v-card-text>
        <video
          ref="video"
          controls
          autoplay
          style="width: 100%"
        >
          <source
            :src="trailer.play_url"
            type="video/mp4"
          >
          抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a :href="trailer.play_url">下载</a>并用你喜欢的播放器观看!
        </video>
      </v-card-text>
      <v-divider />
      <v-card-actions>
        <!--TODO: other style for mobile-->
        <v-btn
          v-for="(item,index) in trailers"
          :key="item._id"
          color="white darken-1"
          text
          @click="changeVideo(index)"
        >
          {{ item.name }}
        </v-btn>
        <v-spacer />

        <v-btn
          color="white darken-1"
          text
          @click="isShow=false"
        >
          关闭
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'MovieDetailVideo',
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    trailers: {
      type: Array,
      default: () => ([{
        cover_url: undefined,
        m: undefined,
        name: undefined,
        play_url: undefined,
        _id: undefined
      }])
    }
  },
  data: function () {
    return {
      trailer: {
        cover_url: undefined,
        m: undefined,
        name: undefined,
        play_url: undefined,
        _id: undefined
      }
    }
  },
  computed: {
    isShow: {
      get: function () {
        return this.dialog
      },
      set: function (newValue) {
        this.$emit('update:dialog', newValue)
        this.$refs.video.pause()
      }
    }
  },
  watch: {
    trailers: function () {
      if (this.trailers) {
        this.trailer = this.trailers[0]
      }
    }
  },
  mounted () {
    if (this.trailers) {
      this.trailer = this.trailers[0]
    }
  },
  methods: {
    changeVideo (index) {
      this.trailer = this.trailers[index]
      this.$refs.video.load()
    }
  }
}
</script>

<style>
</style>
