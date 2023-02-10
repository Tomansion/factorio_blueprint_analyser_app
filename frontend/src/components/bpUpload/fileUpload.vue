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
          placeholder="Paste your JSON or encoded blueprint here"
          v-model="pastedBlueprint"
          @change="uploadedBlueprint = ''; uploadedBlueprintName = ''"
        />
      </div>

      <!-- Blueprint upload -->
      <form
        id="upload"
        class="method"
        @submit.prevent="analyseBlueprint"
      >
        <input
          type="file"
          id="file"
          @change="myUploader"
          accept=".txt,.json"
        />
        <label
          for="file"
          class="mainBtn"
        >

          <img
            src="https://img.icons8.com/material-outlined/24/null/upload--v1.png"
            class="uploadIcon"
          />

          <span
            v-if="uploadedBlueprintName === ''"
            style="text-align:center"
          >
            Upload your JSON <br> or text file
          </span>
          <span v-else>
            {{ uploadedBlueprintName }}
          </span>

        </label>
      </form>
    </div>
    <button
      id="analyseBtn"
      class="arrowBtn"
      :disabled="(uploadedBlueprint === '' && pastedBlueprint === '') || isLoading"
      @click="analyseBlueprint"
    >Analyse</button>
  </div>

</template>

<script>
import { analysisStore } from '@/stores/analysis'
export default {
  data() {
    return {
      pastedBlueprint: '',
      uploadedBlueprint: '',
      uploadedBlueprintName: '',

    }
  },
  methods: {
    myUploader(event) {
      // Read the file
      const reader = new FileReader();
      reader.onload = (e) => {
        this.uploadedBlueprint = e.target.result;
        this.pastedBlueprint = ''
        this.uploadedBlueprintName = event.target.files[0].name
      };
      reader.readAsText(event.target.files[0]);
    },
    analyseBlueprint() {
      if (this.uploadedBlueprint === '' && this.pastedBlueprint === '') return
      if (this.uploadedBlueprint !== '') this.$emit('analyse', this.uploadedBlueprint)
      if (this.pastedBlueprint !== '') this.$emit('analyse', this.pastedBlueprint)
    }
  },
  computed: {
    isLoading() {
      const store = analysisStore();
      return store.isLoading;
    },
  },
}
</script>

<style>
#fileUpload {
  display: flex;
  flex-direction: column;
}

#methods {
  display: flex;
  gap: 60px;
}

.method {
  flex: 1;
}

#paste #pasteArea {
  width: 100%;
  height: 50px;
  resize: none;
  border-radius: 5px;
  border: none;
  padding: 20px;
  font-size: 1.2em;
  font-weight: bold;
  background-color: var(--secondary);
  color: white;
}

/* Upload button style */
#upload input {
  display: none;
}

#upload label {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 5px;
  border: none;
  font-size: 1.5em;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  gap: 40px;
}

#upload label:hover {
  background-color: orange;
}

/* Analyse button style */
#analyseBtn {
  margin-top: 10px;
  align-self: flex-end;
  min-width: 250px;
}
</style>
