<template>
  <div id="blueprintUpload">
    <ParametersSelection @update="parametersUpdate" />
    <FileUpload @analyse="startAnalysis" />
    <BlueprintExemples @analyse="blueprintSelected" />
    <AppFooter />
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
      inserterCapacityBonus: 0,
      parameters: { inserterCapacityBonus: 1 },
    }
  },
  methods: {
    startAnalysis(blueprint) {
      const store = analysisStore();
      store.isLoading = true
      axios.post('analysis', { blueprint: blueprint, parameters: this.parameters })
        .then((response) => {
          // Analysis successfull !
          // Save the analysed blueprint in the store
          store.analysedBlueprint = response.data
          // Save the parameters used for the analysis
          store.parameters = this.parameters
          // Redirect to the analysis page
          this.$router.push({ name: 'AnalysisPage' })
        }).catch((error) => {
          // Analysis failed
          console.log(error);
          if (error.response && error.response.data && error.response.data.error)
            store.sendMessage({
              title: "error",
              msg: error.response.data.error,
            })
          else
            store.sendMessage({
              title: "error",
              msg: "Unknown error, please create an issue on the github repository"
            })

        }).finally(() => {
          store.isLoading = false
        })
    },
    parametersUpdate(parameters) {
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
