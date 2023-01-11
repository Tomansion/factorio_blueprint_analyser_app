<template>
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
          v-model="inserterCapacity"
          :step="1"
          :min="inserterCapacityOptions[0]"
          :max="inserterCapacityOptions[inserterCapacityOptions.length - 1]"
        />
      </div>
      <div id="values">
        <div
          :class="'value' + (inserterCapacity == i ? ' selected' : '')"
          v-for="i in inserterCapacityOptions"
          :key="i"
          @click="inserterCapacity = i"
        >
          {{ i }}
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
      inserterCapacity: 0,
    };
  },
  computed: {
    parameters() {
      return { inserterCapacity: this.inserterCapacity };
    },
  },
  watch: {
    parameters: {
      handler() {
        console.log(this.parameters, "parameters");
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

.parameter .title h2 {
  padding: 0;
  margin: 0;
  color: orange;
}

.parameter .title a {
  text-decoration: underline;
  color: white;
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
  padding: 0 23px 0 23px;
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
  border-radius: 30px;
  height: 0.9em;
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
}
</style> 