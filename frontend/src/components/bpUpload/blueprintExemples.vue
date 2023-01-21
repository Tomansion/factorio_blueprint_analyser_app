<template>
  <div id="blueprintExemples">
    <h2 id="title">Blueprint exemples</h2>
    <div id="blueprintExemplesContainer">
      <div id="exemplesList">
        <button
          :class="'blueprintBtn' + (i === selectedExempleIndex ? ' selected' : '')"
          v-for="(bp, i) in exempleBlueprints"
          :key="i"
          @click="selectedExempleIndex = i"
        >
          {{ bp.name }}
        </button>
      </div>

      <div id="blueprintDetails">
        <img
          id="blueprintImage"
          :src="'images/blueprintExemples/' + exempleBlueprints[selectedExempleIndex].id + '.png'"
          alt="blueprint exemple image"
        >
        <button id="analyseBtn">Analyse</button>
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
      ]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
#blueprintExemples {
  box-shadow: inset 0px 1px 2px 1px #605e60;
  background-color: #313031;
  padding: 15px;
}

#title {
  color: #e6e6e6;
  font-size: 20px;
  font-weight: bold;
  margin: 0 0 10px 0;
}

#blueprintExemplesContainer {
  display: flex;
  gap: 20px;
  height: 300px;
}

#exemplesList {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background-color: #1C1917;
  box-shadow: 0px 0px 3px 0px #000000;
}

.blueprintBtn {
  cursor: pointer;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background: #8e8e8e;
  color: #1d1d1d;
  font-weight: bold;
  box-shadow: inset 0px 2px 1px 0px #BEBEBE;
  border: none;
}

.blueprintBtn:hover {
  background: #eb9928;
  box-shadow: inset 0px 2px 1px 0px #a2691a;
}

.blueprintBtn:active {
  background: #a2691a;
  box-shadow: inset 0px 2px 1px 0px #a2691a;
}

.blueprintBtn.selected {
  background: #6c6c6c;
  box-shadow: inset 0px 2px 1px 0px #292929;
}

#blueprintDetails {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

#blueprintImage {
  flex: 1;
  max-width: 100%;
  height: 200px;
  object-fit: contain;
  background-color: #1c1b22;
  padding: 10px;
  box-shadow: 0px 0px 3px 0px #000000;
}

#analyseBtn {
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 15px;
  height: 30px;
  background: #539c5f;
  color: #1d1d1d;
  font-weight: bold;
  box-shadow: inset 0px 2px 2px 0px #647a64;
  border: none;
  position: relative;
  overflow: hidden;
}

#analyseBtn:hover {
  background: #76a676;
}

#analyseBtn:active {
  background: #7ba34d;
}

#analyseBtn:after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  transform: rotate(-20deg);
  background-color: #313031;
  /* to see where it is */
  left: calc(100% - 8px);
  top: 0%;
  transform-origin: 0 0;
}

#analyseBtn::before {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  transform: rotate(290deg);
  background-color: #313031;
  left: calc(100% - 8px);
  top: 100%;
  transform-origin: 0 0;
}
</style>
