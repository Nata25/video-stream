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

    <canvas id="canvas" />
    <button
      :class="['button', canStream && 'call-page__button']"
      @click="toggleStream"
    >
      {{ buttonLabel }}
    </button>
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
      isStreaming: true
    }
  },
  computed: {
    buttonLabel () {
      return this.isStreaming ? this.pauseLabel : this.resumeLabel
    }
  },
  mounted () {
    this.canStream = checkNavigator()
  },
  methods: {
    toggleStream () {

    }
  }
}
</script>

<style scoped>
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
