<template>
  <Toast position="bottom-center" />
  <router-view />
</template>

<script>
import Toast from 'primevue/toast';

export default {

  name: 'App',
  components: { Toast }
}
</script>
<style>
body,
html,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
