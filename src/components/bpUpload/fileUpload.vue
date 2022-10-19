<template>
  <div id="fileUpload">
    <!-- Blueprint paste -->
    <p-card class="uploadCard">
      <template #title>
        Paste your blueprint
      </template>
      <template #content>
        <p-textarea
          name=""
          id=""
          cols="40"
          rows="5"
          placeholder="Encoded text and JSON are suported"
          v-model="pastedBlueprint"
        ></p-textarea>
        <br>
        <p-button
          id="analyse"
          :disabled="pastedBlueprint === ''"
        >Analyse</p-button>
      </template>
    </p-card>

    <!-- Blueprint upload -->
    <p-card class="uploadCard">
      <template #title>
        Upload your blueprint
      </template>
      <template #content>
        <p>Encoded text and JSON files are supported </p>
        <p-fileupload
          mode="basic"
          name="demo[]"
          :customUpload="true"
          @select="myUploader"
          chooseLabel="Upload"
          :maxFileSize="10000"
        />
        <p-button
          id="analyse"
          :disabled="uploadedBlueprint === ''"
        >Analyse</p-button>
      </template>
    </p-card>
  </div>

</template>
  
<script>
export default {
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
#fileUpload {
  display: flex;
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
  