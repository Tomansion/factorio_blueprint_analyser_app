<template>
  <div id="blueprintUpload">
    <ParametersSelection @update="parametersUpdate" />
    <FileUpload @analyse="startAnalysis" />
    <BlueprintExemples @analyse="blueprintSelected" />
    <AppFooter />

    <!-- <progressspinner
      v-if="loading"
      id="loading"
      style="width:120px;height:120px"
      strokeWidth="10"
      color="#FF9800"
    /> -->

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
      loading: false,
    }
  },
  methods: {
    startAnalysis(blueprint) {
      const store = analysisStore();
      this.loading = true
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
          if (error.response && "error" in error.response.data)
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
          this.loading = false
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
