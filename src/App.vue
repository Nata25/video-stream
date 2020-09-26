<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
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

.page-view {
  display: flex;
  flex-basis: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.button {
  padding: 15px 25px;
  margin-top: 30px;
  font-size: 20px;
  text-transform: uppercase;
  color: darkcyan;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid darkcyan;
  border-radius: 30px;
}
</style>
