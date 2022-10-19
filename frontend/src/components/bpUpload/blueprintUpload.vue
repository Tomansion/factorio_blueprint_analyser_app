<template>
  <div id="blueprintUpload">
    <ParametersSelection />
    <FileUpload />
  </div>
</template>

<script>
import FileUpload from './fileUpload.vue'
import ParametersSelection from './parametersSelection.vue'

export default {
  components: {
    ParametersSelection, FileUpload
  },
  data() {
    return {
      pastedBlueprint: '',
      uploadedBlueprint: '',
    }
  },
  methods: {
    myUploader(event) {
      // Read the file
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedBlueprint = e.target.result;
      };
      reader.readAsText(event.files[0]);
    }
  }
}
</script>

<style scoped>
#blueprintUpload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}

.uploadCard {}

#analyse {
  margin-top: 1em;
}

#uploadContent {
  display: flex;
  flex-direction: column;
}
</style>
