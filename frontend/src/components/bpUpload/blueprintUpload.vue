<template>
  <div id="blueprintUpload">
    <h1>Analysis settings</h1>
    <ParametersSelection @update="parametersUpdate" />
    <FileUpload @analyse="startAnalysis" />
    <BlueprintExemples @analyse="blueprintSelected" />

    <p-progressspinner
      v-if="loading"
      id="loading"
      style="width:50px;height:50px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration="1s"
      color="var(--primary)"
      stroke="#0057e7"
    />

  </div>
</template>

<script>
import FileUpload from './fileUpload.vue'
import ParametersSelection from './parametersSelection.vue'
import BlueprintExemples from './blueprintExemples.vue'

import axios from 'axios'
import { analysisStore } from '@/stores/analysis'

export default {
  components: {
    ParametersSelection, FileUpload, BlueprintExemples
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
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 40px 100px 20px 100px;
}

#blueprintUpload h1 {
  margin-bottom: 0;
  transform: translateX(-40px);
}

#blueprintUpload h2 {
  margin-bottom: 0;
}

#loading {
  position: absolute;
  top: 80%;
}
</style>
