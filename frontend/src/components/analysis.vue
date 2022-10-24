<template>
  <div id="analysis">
    <router-link :to="'/'">Menu</router-link>
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
      console.log(this.analysedBlueprint.blueprint, "analysedBlueprint");
      this.createGraph()
    }

  },
  methods: {
    createGraph() {
      // Create a vis-network graph
      const container = document.getElementById("mynetwork");
      const { nodes, edges } = ansUtil.getAnalysedBlueprintNetwork(this.analysedBlueprint.blueprint);

      const data = {
        nodes: new DataSet(nodes),
        edges: new DataSet(edges)
      }

      const options = {
        interaction: { dragNodes: false },
        physics: false,
        nodes: {
          shape: "image",
          // font: { size: 32 },
          color: {
            border: "#2B7CE9",
            background: "#97C2FC",
            highlight: {
              border: "#2B7CE9",
              background: "#D2E5FF",
            },
            hover: {
              border: "#2B7CE9",
              background: "#D2E5FF",
            },
          },
          borderWidth: 2,
          borderWidthSelected: 10,
        },
        edges: {
          width: 0,
          arrows: "to",
          color: "grey",
          font: {
            size: 32,
          },
        },
      };

      // create a network
      new Network(container, data, options);
    }
  },
}
</script>

<style>
body, html, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}
#analysis {
  width: 100%;
  height: 100%;
}

#mynetwork {
  width: 100%;
  height: 100%;
  border: 1px solid lightgray;
}
</style>