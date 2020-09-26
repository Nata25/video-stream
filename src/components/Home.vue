<template>
  <section class="home page-view">
    <Leaf />
    <router-link
      :to="'/call'"
      class="button"
    >
      {{ label }}
    </router-link>
  </section>
</template>

<script>
import Leaf from './svg/Leaf.vue'

export default {
  name: 'HomePage',
  components: { Leaf },
  data () {
    return {
      label: 'Join'
    }
  }
}
</script>

<style>

  .home svg {
    width: 200px;
    height: 200px;
  }

</style>
