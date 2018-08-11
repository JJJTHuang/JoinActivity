<template>
  <div id="app-box">
    <header-nav></header-nav>
    <div id="app">
      <menu-nav></menu-nav>
      <router-view class="router" />
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/components/HeaderNav.vue'
import MenuNav from '@/components/MenuNav.vue'

export default {
  components: { MenuNav, HeaderNav },
  name: 'App'
}
</script>

<style>
#app-box {
  width: 100%;
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;

  display: flex;
  flex-direction: column;
}

#app {
  flex: 1;
  display: flex;
  flex-direction: row;
}

.router {
  flex: 1;
  padding: 20px;
}
</style>
