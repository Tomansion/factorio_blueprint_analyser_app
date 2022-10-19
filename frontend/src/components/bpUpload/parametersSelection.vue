<template>
  <p-card id="parametersSelection">
    <template #title>
      Analysis parameters
    </template>
    <template #content>
      <div id="inserterCapacity">
        Inserter capacity bonus<a
          href="https://wiki.factorio.com/Inserter_capacity_bonus_(research)"
          target="_blank"
          title="Inserter capacity bonus (research) - Factorio Wiki"
        >(Wiki)</a>
        <p-selectbutton
          v-model="selectedInserterCapacity"
          :options="inserterCapacityOptions"
          aria-labelledby="single"
        />
      </div>

    </template>
  </p-card>
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
      selectedInserterCapacity: 1,
    };
  },
}
</script>

<style scoped>
#inserterCapacity {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>