<template>
  <div id="blueprintUpload">
    <ParametersSelection @update="parametersUpdate" />
    <FileUpload @analyse="startAnalysis" />
    <BlueprintExemples @analyse="blueprintSelected" />
    <AppFooter />

    <p-progressspinner
      v-if="loading"
      id="loading"
      style="width:120px;height:120px"
      strokeWidth="10"
      color="#FF9800"
    />

  </div>
</template>

<script>
import FileUpload from './fileUpload.vue'
import ParametersSelection from './parametersSelection.vue'
import BlueprintExemples from './blueprintExemples.vue'
import AppFooter from './appFooter.vue'

import axios from 'axios'
import { analysisStore } from '@/stores/analysis'

export default {
  components: {
    ParametersSelection, FileUpload, BlueprintExemples, AppFooter
  },
  data() {
    return {
      inserterCapacity: 0,
      parameters: { inserterCapacity: 1 },
      loading: false,
    }
  },
  methods: {
    startAnalysis(blueprint) {
      this.loading = true
      axios.post('analysis', { blueprint: blueprint, parameters: this.parameters })
        .then((response) => {
          // Analysis successfull !
          // Save the analysed blueprint in the store
          analysisStore.analysedBlueprint = response.data
          // Save the parameters used for the analysis
          analysisStore.parameters = this.parameters
          // Redirect to the analysis page
          this.$router.push({ name: 'AnalysisPage' })
        }).catch((error) => {
          // Analysis failed
          console.log(error);
          if (error.response && "error" in error.response.data)
            this.$toast.add({ severity: 'error', summary: 'Analysis error', detail: error.response.data.error, life: 3000 });
          else
            this.$toast.add({ severity: 'error', summary: 'Analysis error', detail: "Unknown error", life: 3000 });
        }).finally(() => {
          this.loading = false
        })
    },
    parametersUpdate(parameters) {
      console.log(parameters, "parameters");
      this.parameters = { ...parameters };
    },
    blueprintSelected(blueprint) {
      this.startAnalysis(blueprint)
    },

  }
}
</script>

<style scoped>
#blueprintUpload {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

#loading {
  position: absolute;
  top: 50%;
}
</style>
