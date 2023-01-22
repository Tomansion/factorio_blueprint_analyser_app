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
@font-face {
  font-family: "Titillium_Web";
  src: local("Titillium_Web"), url(./assets/fonts/Titillium_Web/TitilliumWeb-Regular.ttf) format("truetype");
}

body,
html,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
  color: #aeaeae;
  font-family: "Titillium_Web", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  color: #927851;
  font-weight: bold;
}


h1,
h2 {
  color: #fce2bd;
}
</style>
