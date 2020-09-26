<template>
  <section class="page-view call-page">
    <nav class="call-page__nav">
      <router-link to="/" class="call-page__back">
        <svg
          viewBox="0 0 341.333 341.333"
          width="30"
          height="30"
        >
          <polygon
            points="341.333,149.333 81.707,149.333 200.853,30.187 170.667,0 0,170.667 170.667,341.333 200.853,311.147 81.707,192 341.333,192"
            fill="currentColor"
          />
        </svg>
      </router-link>
    </nav>

    <div v-show="canStream" class="call-page__video">

      <canvas ref="canvas" id="canvas" />

      <video ref="video" width="300" height="200" autoplay />

      <button
        :class="['button', canStream && 'call-page__button']"
        @click="toggleStream"
      >
        {{ buttonLabel }}
      </button>
    </div>

    <p v-if="!canStream" v-html="errorMessage" />

    <section>
      <h3>{{ commentsLabel }}</h3>
      <ul>
        <li
          v-for="comment in comments"
          :key="comment.id"
        >
          <p>{{comment.name}}</p>
          <a
            :href="`mailto:${comment.emal}`"
            target="_blank"
          >
            {{ comment.email }}
          </a>
          <p>{{ comment.body }}</p>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import { checkNavigator } from '@/assets/js/video-stream'

export default {
  name: 'Call',
  data () {
    return {
      resumeLabel: 'Resume video',
      pauseLabel: 'Pause video',
      canStream: false,
      isStreaming: true,
      canvas: null,
      constraints: { video: true },
      errorMessage: 'Sorry, no access to web camera.',
      commentsLabel: 'Comments',
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
    this.canStream = checkNavigator()
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
        const stream = await navigator.mediaDevices.getUserMedia(this.constraints)
        this.paint(stream)
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
  video {
    display: none;
  }

  #canvas {
    width: 500px;
    height: 400px;
  }

  .call-page__nav {
    position: absolute;
    top: 40px;
    left: 40px;
  }

  .call-page__back {
    color: var(--button-color);
  }

  .call-page__button {
    opacity: 0.6;
    animation: fade-in 0.5s forwards;
  }
</style>
