<template>
  <div>
    <p-card>
      <template #title>
        Upload your blueprint
      </template>
      <template #content>
        <textarea name="" id="" cols="60" rows="10" placeholder="Paste your blueprint here"></textarea>
        <br>
        <p-button>Analyse</p-button>
      </template>
    </p-card>
  </div>

</template>

<script>
export default {
  name: 'blueprintUpload',
}
</script>

<style scoped>

</style>
