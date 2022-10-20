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
      console.log(blueprint, "blueprint");
      console.log("starting an analysis with", this.parameters.inserterCapacity, "inserterCapacity");
      axios.post('analysis', {
        blueprint: blueprint,
        parameters: this.parameters
      }).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        console.log(error);
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
