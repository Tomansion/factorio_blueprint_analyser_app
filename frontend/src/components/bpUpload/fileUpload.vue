<template>
  <div
    id="fileUpload"
    class="pannel"
  >
    <h2>Set your blueprint</h2>

    <div id="methods">
      <!-- Blueprint paste -->
      <div
        id="paste"
        class="method"
      >
        <textarea
          id="pasteArea"
          placeholder="Paste your Json or encoded blueprint here"
          v-model="pastedBlueprint"
          @change="uploadedBlueprint = ''"
        />
      </div>

      <!-- Blueprint upload -->
      <div
        id="upload"
        class="method"
      >
        <!-- <p>Encoded text and JSON files are supported </p> -->
        <p-fileupload
          class="mainBtn"
          mode="basic"
          name="demo[]"
          :customUpload="true"
          @select="myUploader"
          chooseLabel="Upload your Json or text file"
          :maxFileSize="1000000"
        />
      </div>
    </div>
    <button
      id="analyseBtn"
      class="arrowBtn"
      :disabled="uploadedBlueprint === '' && pastedBlueprint === ''"
      @click="analyseBlueprint"
    >Analyse</button>
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
        this.pastedBlueprint = ''
      };
      reader.readAsText(event.files[0]);
    },
    analyseBlueprint() {
      if (this.uploadedBlueprint === '' && this.pastedBlueprint === '') return
      if (this.uploadedBlueprint !== '') this.$emit('analyse', this.uploadedBlueprint)
      if (this.pastedBlueprint !== '') this.$emit('analyse', this.pastedBlueprint)
    }
  }
}
</script>

<style>
#fileUpload {
  display: flex;
  flex-direction: column;
}
#methods {
  display: flex;
  gap: 20px;
}

.method {
  flex: 1;
}

#paste #pasteArea {
  width: 100%;
  height: 90px;
  resize: none;
  border-radius: 5px;
  border: none;
  padding: 20px;
  font-size: 1.5em;
  font-weight: bold;
  background-color: var(--secondary);
}

/* Upload button style */
.p-fileupload {
  height: 100%;
  width: 100%;
  padding: 5px;
}

.p-fileupload .p-button {
  height: 100%;
  width: 100%;
}

.p-fileupload .p-button .p-button-icon {
  transform: scale(2);
  translate: 150%;
}

.p-fileupload .p-button-label {
  font-size: 1.2em;
  font-weight: bold;
  margin-left: 40px;
}

#analyseBtn {
  margin-top: 10px;
  align-self: flex-end;
  min-width: 200px;
}
</style>
