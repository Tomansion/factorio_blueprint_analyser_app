<template>
  <div id="blueprintUpload">
    <ParametersSelection @update="parametersUpdate" />
    <FileUpload @analyse="startAnalysis" />
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
    <p-card style="width:60%;overflow-wrap: anywhere;">
      <template #title>
        Example
      </template>
      <template #content>
        <textarea
          style="width: 100%;height: 150px;">0eNqdlVFuwyAMhu/iZ6hCGkKTA+wS0zSR1GqREhIB3VZVufugkbZqTTroI0b+/Bv48QWa7oSjUdpBfQHVDtpC/XoBqw5adiHmziNCDcphDwS07MNKWot90yl9oL1sj0ojZTARUHqPX1CzifyLcEZqOw7G0QY7d5OcT28EUDvlFM5irovzuz71DRpPX2MQGAfr0wYdqgYdG07gDDWtthvuK+yVwXbez4PEP+A8GpylgbdPgHMPXkAV0ahtmkYeDc7TwGU0mKeBRTS4SAPvfsBKWzTOx+6Q4r+LqqLViXV1xQKYZdHkMq1vFu8s+vtQsyj0M95iyyfLnrFTtsIqIu6arfdaLjH543/ygVNnvqer+cc0g6YHlIZ+HhE7WCpWRjTAExsQiQ2ItQbuPvn7WjFmqxL1x3uPsbR3nMebjz20iJ9x13lY30xgAp30rBDzxBfZhqP+QGPnnB0rRJULzouCi/Jm2u6mb9CYh4M=</textarea>
      </template>
    </p-card>
  </div>
</template>

<script>
import FileUpload from './fileUpload.vue'
import ParametersSelection from './parametersSelection.vue'
import axios from 'axios'
import { analysisStore } from '@/stores/analysis'

export default {
  components: {
    ParametersSelection, FileUpload
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
  padding: 30px;
}

.uploadCard {}

#analyse {
  margin-top: 1em;
}

#uploadContent {
  display: flex;
  flex-direction: column;
}

#loading {
  position: absolute;
  top: 80%;
}
</style>
