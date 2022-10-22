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
    }

    var nodes = new DataSet(ansUtil.getNodesFromAnalysedBlueprint(this.analysedBlueprint.blueprint));
    var edges = new DataSet(ansUtil.getEdgesFromAnalysedBlueprint(this.analysedBlueprint.blueprint));


    var options = {};

    // create a network
    var container = document.getElementById("mynetwork");
    new Network(container, { nodes, edges }, options);
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