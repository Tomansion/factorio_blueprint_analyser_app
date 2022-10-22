<template>
  <div>
    Hello
    {{analysedBlueprint}}
  </div>
</template>

<script>
import { analysisStore } from '@/stores/analysis'

export default {
  name: 'analysis-page',
  data() {
    return {
      analysedBlueprint: null
    }
  },
  mounted() {
    this.analysedBlueprint = analysisStore.analysedBlueprint

    console.log(analysisStore);
    console.log(this.analysedBlueprint);

    if (this.analysedBlueprint === undefined) {
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style>

</style>