<template>
  <div id="blueprintUpload">
    <ParametersSelection @update="parametersUpdate" />
    <FileUpload @analyse="startAnalysis" />
  </div>
</template>

<script>
import FileUpload from './fileUpload.vue'
import ParametersSelection from './parametersSelection.vue'
import axios from 'axios'

export default {
  components: {
    ParametersSelection, FileUpload
  },
  data() {
    return {
      inserterCapacity: 1,
      parameters: { inserterCapacity: 1 }
    }
  },
  methods: {
    startAnalysis(blueprint) {
      axios.post('analysis', { blueprint: blueprint, parameters: this.parameters })
        .then((response) => {
          console.log(response);
          // Analysis successfull
          this.$router.push({ name: 'Analysis', params: { analysedBlueprint: response.data } })
        }).catch((error) => {
          console.log(error);
          if (error.response && "error" in error.response.data)
            this.$toast.add({ severity: 'error', summary: 'Analysis error', detail: error.response.data.error, life: 3000 });
          else
            this.$toast.add({ severity: 'error', summary: 'Analysis error', detail: "Unknown error", life: 3000 });
        });
    },
    parametersUpdate(parameters) {
      console.log(parameters, "parameters");
      this.parameters = { ...parameters };
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
