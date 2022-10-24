<template>
  <div>
    <router-link :to="'/'"></router-link>
    Hello
    {{analysedBlueprint}}
    <div id="mynetwork"></div>
  </div>
</template>

<script>
import { analysisStore } from '@/stores/analysis'
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import ansUtil from './analysis/analysis.js'

export default {
  name: 'analysis-page',
  data() {
    return {
      analysedBlueprint: null
    }
  },
  mounted() {
    this.analysedBlueprint = analysisStore.analysedBlueprint
    if (
      !this.analysedBlueprint ||
      !this.analysedBlueprint.blueprint
    ) {
      this.$router.push({ name: 'Home' })
    } else {
      this.createGraph()
    }

  },
  methods: {
    createGraph() {
      // Create a vis-network graph
      const container = document.getElementById("mynetwork");
      const nodes = new DataSet(ansUtil.getNodesFromAnalysedBlueprint(this.analysedBlueprint.blueprint));
      const edges = new DataSet(ansUtil.getEdgesFromAnalysedBlueprint(this.analysedBlueprint.blueprint));

      const options = {
        interaction: { dragNodes: false },
        physics: false,
        nodes: {
          shape: "image",
          size: 10,
          font: {
            size: 32,
          },
          color: "white",
          borderWidth: 2,
        },
        edges: {
          width: 1,
          arrows: "to",
          color: "white",
          font: {
            size: 32,
          },
        },
      };

      // create a network
      new Network(container, { nodes, edges }, options);
    }
  },
}
</script>

<style>
#mynetwork {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>