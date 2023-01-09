<template>
  <div
    id="inserterCapacity"
    class="parameter"
  >
    <img src="https://wiki.factorio.com/images/Inserter_capacity_bonus_%28research%29.png" />

    <div class="title">
      <h1>
        Inserter capacity bonus
      </h1>
      <a
        href="https://wiki.factorio.com/Inserter_capacity_bonus_(research)"
        target="_blank"
        title="Inserter capacity bonus (research) - Factorio Wiki"
      >Learn more about this on the Wiki</a>
    </div>

    <p-selectbutton
      v-model="inserterCapacity"
      :options="inserterCapacityOptions"
      aria-labelledby="single"
    />
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
  padding-right: 60px;
  padding-left: 20px;
}
.parameter .title h1 {
  padding: 0;
  margin: 0;
  color: orange;
}

.parameter .title a {
  text-decoration: underline;
}
</style> 