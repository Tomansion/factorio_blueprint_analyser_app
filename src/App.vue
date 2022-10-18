<template>
  <div>
    <h1>Welcome to the Factorio blueprint analyser</h1>
    <blueprintUpload />
  </div>
</template>

<script>
import blueprintUpload from './components/blueprintUpload.vue'

export default {
  name: 'App',
  components: {
    blueprintUpload
  }
}
</script>

<style>
h1 {
  color: white;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
