<template>
  <div>
    <Sidebar></Sidebar>
    <div style="transition: 0.3s linear; margin-right: 20px; overflow: hidden;" :style="{ 'margin-left': `${parseInt(sidebarWidth) + 30}px`}">
      <router-view />
    </div>
  </div>
</template>
<script>
import Sidebar from './components/sidebar/Sidebar'
import { sidebarWidth } from './components/sidebar/sidebarState';
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  }
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
