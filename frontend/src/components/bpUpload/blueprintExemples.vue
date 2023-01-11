<template>
  <div id="blueprintExemples">
    <div id="exemplesList">
      <div
        class="blueprintName"
        v-for="(bp, i) in exempleBlueprints"
        :key="i"
        @click="selectedExempleIndex = i"
      >
        {{ bp.name }}
      </div>
    </div>

    <div id="blueprintDetails">
      <img
        id="blueprintImage"
        :src="'images/blueprintExemples/' + exempleBlueprints[selectedExempleIndex].id + '.png'"
        alt="blueprint exemple image"
      >
      <button>Analyse</button>
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
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#blueprintExemples {
  display: flex;
  gap: 20px;
  border: 1px solid black;
}
#exemplesList {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
.blueprintName {
  cursor: pointer;
  border: 1px solid black;
  padding: 5px;
}

#blueprintDetails {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}

#blueprintImage {
  width: 100%;
  height: 100%;
}
</style>
