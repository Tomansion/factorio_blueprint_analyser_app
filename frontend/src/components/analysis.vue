<template>
  <div>
    Hello
    {{analysedBlueprint}}
    <div id="mynetwork"></div>
  </div>
</template>

<script>
import { analysisStore } from '@/stores/analysis'
import { Network } from "vis-network";
import { DataSet } from "vis-data";

export default {
  name: 'analysis-page',
  data() {
    return {
      analysedBlueprint: null
    }
  },
  mounted() {
    this.analysedBlueprint = analysisStore.analysedBlueprint

    if (this.analysedBlueprint === undefined) {
      this.$router.push({ name: 'Home' })
    }
    console.log(Network);
    console.log(DataSet);

    var nodes = new DataSet([
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ]);

    var edges = new DataSet([
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
      { from: 3, to: 3 },
    ]);

    var options = {};

    // create a network
    var container = document.getElementById("mynetwork");
    var network = new Network(container, { nodes, edges }, options);
  }
}
</script>

<style>
#mynetwork {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>