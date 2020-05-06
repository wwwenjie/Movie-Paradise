<template>
  <v-sheet width="100%">
    <div class="home-video-grid">
      <div class="home-video-grid-video">
        <video
          ref="video"
          autoplay
          muted
          playsinline
          x5-playsinline
          webkit-playsinline
          class="home-video-video"
          @durationchange="duration = timeTranslate(videoDom.duration)"
          @timeupdate="onTimeUpdate(videoDom.currentTime)"
          @playing="paused = false"
          @ended="paused = true"
        >
          <source
            src="static/video2.mp4"
            type="video/mp4"
          >
          抱歉，您的浏览器不支持内嵌视频，不过不用担心，你可以 <a href="/static/video.mp4">下载</a>并用你喜欢的播放器观看!
        </video>
      </div>
      <div class="home-video-grid-layer">
        <div class="home-video-info">
          <span
            v-class="['display-1','display-2']"
            class="white--text font-weight-bold"
          >
            我们与恶的距离
          </span>
          <div class="white--text mt-2">
            <span class="d-block">中国台湾 / 豆瓣 9.5</span>
            <span class="d-block">剧情 / 社会 / 现实</span>
          </div>
          <v-btn
            class="home-video-info-button mt-2 font-weight-bold"
          >
            <v-icon left>
              mdi-information-outline
            </v-icon>
            更多信息
          </v-btn>
        </div>
        <div class="home-video-control">
          <v-btn
            icon
            class="home-video-control-button white--text"
            @click="statusChange"
          >
            <v-icon>
              {{ icon }}
            </v-icon>
          </v-btn>
          <div
            class="home-video-control-container"
            @click="progressChange($event)"
          >
            <span
              ref="progress"
              class="home-video-control-progress"
            />
          </div>
          <span class="home-video-control-text white--text">{{ currentTime }} / {{ duration }}</span>
        </div>
      </div>
    </div>
  </v-sheet>
</template>

<script>
export default {
  name: 'HomeVideo',
  data () {
    return {
      paused: true,
      videoDom: undefined,
      icon: 'mdi-volume-off',
      duration: '00:00',
      currentTime: '00:00'
    }
  },
  watch: {
    paused: function (val) {
      if (val) {
        this.icon = 'mdi-restart'
      } else {
        this.icon = this.videoDom.muted ? 'mdi-volume-off' : 'mdi-volume-high'
      }
    }
  },
  mounted () {
    this.videoDom = this.$refs.video
  },
  methods: {
    statusChange () {
      if (this.paused) {
        this.videoDom.currentTime = 0
        this.videoDom.play()
      } else {
        this.videoDom.muted = !this.videoDom.muted
      }
      this.icon = this.videoDom.muted ? 'mdi-volume-off' : 'mdi-volume-high'
    },
    onTimeUpdate (currentTime) {
      this.currentTime = this.timeTranslate(currentTime)
      const percentage = 100 * this.videoDom.currentTime / this.videoDom.duration
      this.$refs.progress.style.width = percentage + '%'
    },
    progressChange (e) {
      this.paused = false
      this.videoDom.currentTime = e.offsetX / e.currentTarget.offsetWidth * this.videoDom.duration
      this.videoDom.play()
      this.$refs.progress.style.width = 100 * e.offsetX / e.currentTarget.offsetWidth + '%'
    },
    timeTranslate (t) {
      let m = Math.floor(t / 60)
      m < 10 && (m = '0' + m)
      return m + ':' + (t % 60 / 100).toFixed(2).slice(-2)
    }
  }
}
</script>

<style lang="sass">
  $progress-width: 135px
  $progress-height: 36px
  .home-video
    &-video
      object-fit: cover
      width: 100%
      max-height: calc(100vh - 48px)

    &-grid
      display: grid
      grid-template-columns: 1fr
      grid-template-areas: "overflow"

      &-video
        grid-area: overflow
        overflow: hidden
        display: block

      &-layer
        display: grid
        align-content: center
        grid-area: overflow
        grid-template-columns: 3fr 1fr
        z-index: 1

    &-info
      padding-left: 5vw

      &-button
        background-color: rgba(51, 51, 51, .6) !important
        color: white !important
        padding: 0 24px !important

        &:hover
          color: black !important
          background-color: white !important

    &-control
      display: flex
      flex-direction: row
      align-items: flex-end
      justify-content: flex-end

      &-button
        margin-right: 5px
        background-color: rgba(51, 51, 51, .6)
        border: 1px solid rgba(255, 255, 255, .5)

      &-text
        width: $progress-width
        height: $progress-height
        border: 3px white
        border-style: none none none solid
        background-color: rgba(51, 51, 51, .6)
        padding: 6px 30px 6px 6px

      &-container
        position: absolute
        width: $progress-width
        height: $progress-height
        cursor: pointer
        z-index: 1

      &-progress
        position: absolute
        height: 100%
        background-color: rgba(255, 255, 255, .5)
        transition: all .2s
</style>
