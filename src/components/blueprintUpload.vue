<template>
  <div id="blueprintUpload">
    <!-- Blueprint paste -->
    <p-card>
      <template #title>
        Paste your blueprint
      </template>
      <template #content>
        <p-textarea name="" id="" cols="60" rows="10"
          placeholder="Paste your blueprint here. Encoded text and JSON are suported"></p-textarea>
        <br>
        <p-button id="analyse">Analyse</p-button>
      </template>
    </p-card>
    <!-- Blueprint upload -->
    <p-card>
      <template #title>
        Upload your blueprint
      </template>
      <template #content>
        <p-button id="analyse">Analyse</p-button>
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
#blueprintUpload {
  display: flex;
  justify-content: center;
  align-items: center;
  gap:30px;
}

#analyse {
  margin-top: 1em;
}

#uploadContent {
  display: flex;
  flex-direction: column;
}
</style>
