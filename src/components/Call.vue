<template>
  <main class="page-view call-page">
    <nav class="navigation">
      <router-link to="/" class="arrow-back">
        <svg
          viewBox="0 0 477.175 477.175"
          width="30"
          height="30"
        >
          <path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225 c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z" />
        </svg>
      </router-link>
    </nav>

    <section v-show="canStream" class="video-container">
      <h1 class="call-label">{{ streamingLabel }}</h1>
      <canvas
        ref="canvas"
        id="canvas"
        :class="[!isStreaming && 'paused']"
      />

      <video ref="video" autoplay />

      <button
        :class="['video-button', isStreaming && 'pause', !isStreaming && 'play']"
        @click="toggleStream"
      >
        <transition name="fade">
          <Pause v-show="isStreaming" />
        </transition>
        <transition name="fade">
          <Play v-show="!isStreaming" />
        </transition>
      </button>

      <button class="button" @click="toggleStream">{{ buttonLabel }}</button>
    </section>

    <p v-if="!canStream" v-html="errorMessage" />

    <Comments
      :label="commentsLabel"
      :show="buttonLabelShow"
      :hide="buttonLabelHide"
      :items="comments"
    />
  </main>
</template>

<script>
import { checkGetUserMedia } from '@/assets/js/video-stream'
import data from '@/assets/data'
import Comments from './Comments'
import Play from './svg/Play'
import Pause from './svg/Pause'

const CONSTRAINTS = {
  video: {
    width: 640,
    height: 480
  }
}

export default {
  name: 'Call',

  components: { Comments, Play, Pause },

  data () {
    const {
      streamingLabel,
      resumeLabel,
      pauseLabel,
      errorMessage,
      commentsLabel,
      buttonLabelShow,
      buttonLabelHide
    } = data
    return {
      streamingLabel,
      resumeLabel,
      pauseLabel,
      errorMessage,
      commentsLabel,
      buttonLabelShow,
      buttonLabelHide,
      canStream: false,
      isStreaming: false,
      canvas: null,
      comments: []
    }
  },

  computed: {
    buttonLabel () {
      return this.isStreaming ? this.pauseLabel : this.resumeLabel
    }
  },

  async created () {
    const { data } = await this.axios.get('https://jsonplaceholder.typicode.com/comments')
    this.comments = data
  },

  async mounted () {
    this.canStream = checkGetUserMedia()
    if (this.canStream) {
      await this.$nextTick()
      this.canvas = this.$refs.canvas
      this.getStream()
    }
  },

  methods: {
    toggleStream () {
      this.isStreaming = !this.isStreaming
      if (this.isStreaming) this.getStream()
    },

    async getStream () {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS)
        this.paint(stream)
        this.isStreaming = true
      } catch (e) {
        this.canStream = false
        console.error(e)
      }
    },

    paint (stream) {
      const { video } = this.$refs
      if (video) video.srcObject = stream
      const _this = this
      const ctx = this.canvas.getContext('2d')
      const af = requestAnimationFrame(draw)

      function draw () {
        if (_this.isStreaming) {
          _this.canvas.width = video.videoWidth
          _this.canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, _this.canvas.width, _this.canvas.height)
          requestAnimationFrame(draw)
        } else cancelAnimationFrame(af)
      }
    }
  }
}
</script>

<style scoped>
  .call-page {
    padding-top: 40px;
  }

  .call-label {
    margin-top: 0;
    margin-bottom: 45px;
    text-align: center;
  }

  video {
    display: none;
  }

  #canvas {
    position: relative;
    width: 640px;
    height: 480px;
    transition: opacity 0.3s;
    border-radius: 40px;
  }

  #canvas.paused {
    opacity: 0.8;
  }

  .navigation {
    position: absolute;
    z-index: 1;
    top: 40px;
    left: 40px;
  }

  .arrow-back {
    color: var(--button-link-color);
  }

  .video-container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .buttons-group {
    position: relative;
  }

  .video-button {
    position: absolute;
    right: 12px;
    top: -8px;
    width: 60px;
    height: 60px;
    background: transparent;
    border: 0;
    outline: none;
    cursor: pointer;
    transition: opacity 0.3s;
  }

  .video-button.pause {
    color: var(--red);
  }

  .video-button.play {
    color: var(--button-link-color);
  }

  .video-button svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .video-button::after {
    position: absolute;
    display: inline-block;
    right: 50%;
    bottom: 50px;
    white-space: nowrap;
    content: attr(data-label);
    transform: translateX(50%);
    font-family: Avenir, sans-serif;
    text-transform: uppercase;
  }

  @media screen and (max-width: 768px) {
    #canvas {
      width: 320px;
      height: 240px;
    }

    .video-button {
      top: -4px;
      width: 45px;
      height: 45px;
    }
  }
</style>
