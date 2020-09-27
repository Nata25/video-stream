<template>
  <main class="home page-view">
    <Leaf />
    <router-link
      :to="'/call'"
      class="button"
    >
      {{ label }}
    </router-link>
  </main>
</template>

<script>
import data from '@/assets/data'
import Leaf from './svg/Leaf.vue'

export default {
  name: 'HomePage',
  components: { Leaf },
  data () {
    return {
      label: data.homeLabel
    }
  }
}
</script>

<style>
  .home svg {
    width: 300px;
    height: 300px;
  }

  .home svg path {
    animation: animate-stroke 2s forwards;
  }

  @keyframes animate-stroke {
    from {
      stroke-dasharray: 150;
      stroke-dashoffset: -100%;
    }
    to {
      stroke-dasharray: 1000;
      stroke-dashoffset: 0;
    }
  }

</style>
