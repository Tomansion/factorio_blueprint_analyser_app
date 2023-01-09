<template>
  <div id="fileUpload">
    <h1 id="title">
      Set your blueprint
    </h1>

    <div id="methods">
      <!-- Blueprint paste -->
      <div
        id="paste"
        class="method"
      >
        <textarea
          id=""
          placeholder="Paste your Json or encoded blueprint here"
          v-model="pastedBlueprint"
        />
        <!-- <p-button
          id="analyse"
          :disabled="pastedBlueprint === ''"
          @click="analysePasted"
        >Analyse</p-button> -->
      </div>

      <span id="or">OR</span>

      <!-- Blueprint upload -->
      <div
        id="upload"
        class="method"
      >
        <!-- <p>Encoded text and JSON files are supported </p> -->
        <p-fileupload
          mode="basic"
          name="demo[]"
          :customUpload="true"
          @select="myUploader"
          chooseLabel="Upload Json or Encoded text"
          :maxFileSize="10000"
        />
        <!-- <p-button
        id="analyse"
        :disabled="uploadedBlueprint === ''"
        @click="analyseUploaded"
      >Analyse</p-button> -->
      </div>
    </div>
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
    },
    analysePasted() {
      this.$emit('analyse', this.pastedBlueprint)
    },
    analyseUploaded() {
      this.$emit('analyse', this.uploadedBlueprint)
    }
  }
}
</script>
  
<style>
#fileUpload {
  width: 80%;
  text-align: center;
}

#title {
  text-align: left;
}

#methods {
  display: flex;
  gap: 30px;
}

.method {
  flex: 1;
}

#paste textarea {
  width: 100%;
  height: 100px;
  resize: none;
}

#or {
  display: flex;
  align-items: center;
  font-size: 1.5em;
}

#uploadContent {
  display: flex;
  flex-direction: column;
}

.p-fileupload {
  height: 100%;
  width: 100%;
}

.p-fileupload .p-button {
  height: 100%;
  width: 100%;
}

.p-fileupload .p-button .p-button-icon {
  transform: scale(2);
  translate: 30%;
}
</style>
  