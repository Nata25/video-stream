<template>
  <div ref="viewportTrigger" class="viewportTrigger" />
</template>

<script>
import { initObserver, observeElement, unobserveElement } from '@/assets/js/observer'

export default {
  name: 'Trigger',

  data () {
    return {
      observer: null
    }
  },

  mounted () {
    this.observer = initObserver()

    observeElement(this.observer, this.$el)
    this.$el.addEventListener('inview', this.onInview)
  },

  beforeDestroy () {
    this.$el.removeEventListener('inview', this.onInview)
    unobserveElement(this.observer, this.$el)
  },

  methods: {
    onInview () {
      this.$emit('inview')
    }
  }
}
</script>
