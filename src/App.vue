<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import '@/assets/styles/main.css'

export default {
  name: 'App'
}
</script>

<style>
body,
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 100vh;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
