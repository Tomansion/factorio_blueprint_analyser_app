<template>
  <div
    id="blueprintExemples"
    class="pannel"
  >
    <h2>Blueprint exemples</h2>
    <div id="blueprintExemplesContainer">
      <div
        id="exemplesList"
        class="list"
      >
        <button
          :class="'blueprintBtn mainBtn' + (i === selectedExempleIndex ? ' selected' : '')"
          v-for="(bp, i) in exempleBlueprints"
          :key="i"
          @click="selectedExempleIndex = i"
        >
          {{ bp.name }}
        </button>
      </div>

      <div id="blueprintDetails">
        <div
          id="blueprintPannel"
          @click="zoomOnImage"
        >
          <img
            id="blueprintImage"
            :src="'blueprintExemples/' + exempleBlueprints[selectedExempleIndex].id + '.png'"
            alt="blueprint exemple image"
          >
        </div>
        <div id="btns">
          <button
            id="copyBtn"
            class="mainBtn"
            @click="copyBlueprint"
          >Copy</button>
          <button
            id="analyseBtn"
            class="arrowBtn"
            @click="startAnalysis"
          >Analyse</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedExempleIndex: 0,
      exempleBlueprints: [
        {
          name: "Simple belt factory",
          id: "Simple_belt_factory"
        },
        {
          name: "Underground pipes factory",
          id: "Underground_pipes_factory"
        },
        {
          name: "Red circuit factory",
          id: "Red_circuit_factory"
        },
        {
          name: "Module factory",
          id: "Module_factory"
        },
        {
          name: "Inserter factory",
          id: "Inserters_factory"
        },
      ]
    }
  },
  methods: {
    startAnalysis() {
      const bpId = this.exempleBlueprints[this.selectedExempleIndex].id;

      // Load the blueprint from the txt file
      fetch(`./blueprintExemples/${bpId}.txt`)
        .then(response => response.text())
        .then(data => this.$emit("analyse", data));
    },
    copyBlueprint() {
      const bpId = this.exempleBlueprints[this.selectedExempleIndex].id;

      // Load the blueprint from the txt file
      fetch(`./blueprintExemples/${bpId}.txt`)
        .then(response => response.text())
        .then(data => {
          // Copy the blueprint to the clipboard
          navigator.clipboard.writeText(data);
          // Display a toast
          this.$toast.add({ severity: 'success', summary: 'Blueprint copied', detail: "The blueprint has been copied to your clipboard", life: 3000 });
        });
    },
    zoomOnImage() {
      const bpId = this.exempleBlueprints[this.selectedExempleIndex].id;
      window.open(`./blueprintExemples/${bpId}.png`, '_blank').focus();
    }
  }
}
</script>

<style scoped>
#blueprintExemplesContainer {
  display: flex;
  gap: 20px;
}

#exemplesList {
  flex: 1;
}

.blueprintBtn {
  height: 45px;
}


#blueprintDetails {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#blueprintPannel {
  flex: 1;
  background-color: #1c1b22;
  padding: 5px;
  box-shadow: 0px 0px 2px 0px #424242;
  cursor: zoom-in;

  display: flex;
  justify-content: center;
  align-items: center;
}

#blueprintImage {
  object-fit: contain;
  max-width: 100%;
  height: 30vh;
}

#btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

#copyBtn {
  height: 30px;
}

#analyseBtn {
  flex: 1;
  margin: 0;
}
</style>
