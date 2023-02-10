<template>
  <div
    id="parametersSelection"
    class="pannel"
  >
    <h2>Analysis settings</h2>

    <div
      id="parameters"
      class="list"
    >
      <div
        id="inserterCapacity"
        class="parameter"
      >
        <img src="https://wiki.factorio.com/images/Inserter_capacity_bonus_%28research%29.png" />

        <div class="title">
          <h2>
            Inserter capacity bonus
          </h2>
          <a
            href="https://wiki.factorio.com/Inserter_capacity_bonus_(research)"
            target="_blank"
            title="Inserter capacity bonus (research) - Factorio Wiki"
          >Learn more about this on the Wiki</a>
        </div>

        <div id="slider">
          <div id="rangeSlider">
            <input
              type="range"
              v-model="inserterCapacityBonus"
              :step="1"
              :min="inserterCapacityOptions[0]"
              :max="inserterCapacityOptions[inserterCapacityOptions.length - 1]"
            />
          </div>
          <div id="values">
            <div
              :class="'value' + (inserterCapacityBonus == i ? ' selected' : '')"
              v-for="i in inserterCapacityOptions"
              :key="i"
              @click="inserterCapacityBonus = i"
            >
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const inserterCapacityNumber = 8
    const inserterCapacityOptions = []
    for (let i = 0; i < inserterCapacityNumber; i++)
      inserterCapacityOptions.push(i)

    return {
      inserterCapacityOptions,
      inserterCapacityBonus: 0,
    };
  },
  computed: {
    parameters() {
      return { inserterCapacityBonus: this.inserterCapacityBonus };
    },
  },
  watch: {
    parameters: {
      handler() {
        this.$emit("update", this.parameters);
      },
      deep: true,
    },
  },

}
</script>

<style scoped>
.parameter {
  display: flex;
  gap: 0px;
  align-items: center;
}

.parameter img {
  width: 60px;
  height: 60px;
}

.parameter .title {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 60px;
  padding-left: 20px;
}

/* Slider  */
#slider {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-top: 10px;
}

#slider #rangeSlider {
  text-align: center;
}

#slider #rangeSlider input {
  cursor: pointer;
  /* Cursor on hover */
  -webkit-appearance: none;
  appearance: none;
  width: 91%;
  border-radius: 30px;
  background-color: rgb(140, 91, 0);
  height: 10px;
}

#slider #rangeSlider input::-webkit-slider-thumb {
  width: 25px;
  height: 25px;
  background-color: orange;
  border-radius: 30px;
  border: none;
  box-shadow: 0 0 10px 10px #ffffff07;
}

#slider #rangeSlider input::-moz-range-thumb {
  width: 25px;
  height: 25px;
  background-color: orange;
  border-radius: 30px;
  border: none;
  box-shadow: 0 0 10px 10px #ffffff07;
}

#slider #values {
  display: flex;
  justify-content: space-between;
  font-size: 1.5em;
  color: lightgray;
}

#slider #values .value {
  cursor: pointer;
  text-align: center;
  flex: 1;
}

#slider #values .selected {
  color: orange;
  font-weight: bold;
}
</style> 
