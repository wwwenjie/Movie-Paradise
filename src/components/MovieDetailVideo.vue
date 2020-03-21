<template>
  <v-dialog
    v-model="isShow"
    max-width="920"
  >
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>

      <v-card-text>
        <video
          ref="video"
          controls
          autoplay
          style="width: 100%">
          <source
            :src="src"
            type="video/mp4"
          >
          抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a :href="src">下载</a>并用你喜欢的播放器观看!
        </video>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>

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
    src: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: 'Trailer'
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
  }
}
</script>

<style>
</style>
