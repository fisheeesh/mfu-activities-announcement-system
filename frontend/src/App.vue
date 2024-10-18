<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import Sidebar from './components/sidebar/Sidebar'
export default {
  components: { Sidebar },
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
