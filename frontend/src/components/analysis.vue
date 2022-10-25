<template>
  <div id="analysis">
    <p-menubar class="header">
      <template #start>
        <div id="menuStart">
          <p-button @click="$router.push('/')">🡠 New analysis</p-button>
          <h1> Factorio Blueprint Analysis </h1>
        </div>
        <!-- <router-link :to="'/'">Menu</router-link> -->
      </template>
      <template #end>
        <div id="menuEnd">
          {{version}}
          <p-button
            id="github"
            icon="pi pi-github"
            class="p-button-secondary"
            @click="openGithub"
          >
          </p-button>
        </div>
      </template>
    </p-menubar>

    <!-- Blueprint data -->
    <p-card class="data">
      <template #title>
        Blueprint
      </template>
      <template #content>
        <div
          id="data"
          v-if="analysedBlueprint !== null"
        >
          <div id="blueprintName">
            <u>Name:</u>
            <h4>
              {{analysedBlueprint.blueprint.label}}
            </h4>
          </div>
          <div
            id="blueprintDescription"
            v-if="analysedBlueprint.blueprint.description"
          >
            <u>Description:</u>
            {{analysedBlueprint.blueprint.description}}
          </div>
          <div id="blueprintIcons">
            <u>Icons:</u>
            <br>
            <img
              class="icon"
              v-for="(icon, i) in analysedBlueprint.blueprint.icons"
              :key="i"
              :src="itemNameToIcon(icon.signal.name)"
            />
          </div>
        </div>
      </template>
    </p-card>

    <!-- Analysis parameters -->
    <p-card class="config">
      <template #title>
        Parameters
      </template>
      <template #content>
        <div id="data">
          <div id="blueprintName">
          </div>
          <div id="blueprintDescription">
            Blueprint description
          </div>
        </div>
      </template>
    </p-card>

    <!-- Analysis results -->
    <div
      class="graph"
      id="mynetwork"
    >
    </div>

    <!-- Buttons -->
    <p-menubar class="buttons">
      <template #end>
        <div id="buttons">
          <p-button
            class="p-button-secondary"
            @click="newIssue"
            title="Report an issue"
          >😥 Did something went wrong?</p-button>
          <p-button>📥 Export Json</p-button>
        </div>
      </template>
    </p-menubar>
  </div>
</template>

<script>
import { analysisStore } from '@/stores/analysis'
import { Network } from "vis-network";
import { DataSet } from "vis-data";
import ansUtil from './analysis/analysis.js'
import packageJson from "../../package.json";

export default {
  name: 'analysis-page',
  data() {
    const version = packageJson.version;
    return {
      analysedBlueprint: null,
      version,
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

      const nodesDataset = new DataSet(nodes);
      const edgesDataset = new DataSet(edges);

      const data = {
        nodes: nodesDataset,
        edges: edgesDataset,
      }

      const options = {
        interaction: {
          dragNodes: false,
          hover: true,
          selectable: false,
          keyboard: { enabled: true },
        },
        manipulation: {
          enabled: true,
        },
        physics: false,
        nodes: {
          shape: "image",
          font: {
            size: 20,
            color: "#ffffff",
          },
          color: {
            hover: { background: "grey" },
          }
        },
        edges: {
          width: 0.15,
          color: "grey",
        },
        groups: {
          entity: {
            color: {
              background: "transparent",
            },
            borderWidth: 2,
            shapeProperties: { useBorderWithImage: true },
          },
          tranpostedItem: {
            opacity: 0.9,
            color: {
              border: "white",
              background: "black",
            },
            borderWidth: 0,
            imagePadding: 1,
            shapeProperties: { useBorderWithImage: true },
          },
          recipe: {
            opacity: 0.9,
            color: {
              background: "white",
              opacity: 0.1,
            },
            imagePadding: 5,
            borderWidth: 0,
            shapeProperties: { useBorderWithImage: true },
          },
          legend: {
            interaction: {
              dragNodes: false,
              hover: false,
              selectable: false,
              keyboard: { enabled: false },
            },
            font: {
              size: 15,
              color: "grey",
            },
            size: 15,
            shape: "square",
          }
        },
      };

      // create a network
      const network = new Network(container, data, options);

      // Deal with events
      // We want to display use rate and transported items on hover
      network.on("hoverNode", (e) => {
        const label_info = ansUtil.getHoverLabel(e.node, this.analysedBlueprint.blueprint);
        if (label_info === null) return
        nodesDataset.update({ id: e.node, label: label_info });
      });
      network.on("blurNode", (e) => {
        if (e.node.includes("legend")) return
        nodesDataset.update({ id: e.node, label: "" });
      });
    },
    itemNameToIcon(itemName) {
      return "https://wiki.factorio.com/images/" + ansUtil.nameToImageName(itemName)
    },
    openGithub() {
      window.open("https://github.com/tomansion/factorio_blueprint_analyser_app/", '_blank').focus();
    },
    newIssue() {
      window.open("https://github.com/Tomansion/factorio_blueprint_analyser_app/issues/new", '_blank').focus();
    },
  },
}
</script>

<style>
#analysis {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 80px 3.9fr 2.1fr 80px;
  grid-auto-flow: row;
  grid-template-areas:
    "header header"
    "data graph"
    "config graph"
    "config buttons";
  width: 100%;
  height: 99%;
}

.p-card,
.p-menubar {
  padding: 10px;
  margin: 10px;
  box-shadow: 5px 5px 15px 5px #00000021 !important;
}


.header {
  grid-area: header;
}

#menuStart {
  display: flex;
  align-items: center;
  gap: 20px;
}

#menuEnd {
  display: flex;
  align-items: center;
  gap: 10px;
}

.data {
  grid-area: data;
}

#blueprintIcons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

#blueprintIcons img {
  width: 50px;
  height: 50px;
}

.config {
  grid-area: config;
  color: #ff880021;
}

.graph {
  grid-area: graph;
  /* border: 1px solid lightgray; */
}

.buttons {
  grid-area: buttons;
}

#buttons {
  display: flex;
  gap: 10px;
}
</style>