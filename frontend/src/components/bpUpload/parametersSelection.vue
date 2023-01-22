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
          <div id="p-slider">
            <p-slider
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
  gap: 25px;
  padding-top: 20px;
}

#slider #p-slider {
  padding: 0 38px 0 38px;
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

#slider .p-slider {
  background-color: rgb(51, 47, 68);
  height: 0.9em;
  border-radius: 3px;
}
</style> 

<style>
#slider .p-slider-range {
  background-color: rgb(140, 91, 0);
  border-radius: 30px;
}

#slider .p-slider .p-slider-handle {
  background-color: orange;
  border: none;
  height: 1.8em;
  width: 1.8em;
  margin-top: -0.915rem;
  margin-left: -0.915rem;
  border-radius: 5px;
}
</style> 