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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
