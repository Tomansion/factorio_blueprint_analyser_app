<template>
  <div id="analysis">
    <div class="header pannel">
      <button
        class="mainBtn"
        @click="$router.push('/')"
      >🡠 New analysis</button>
      <h1> Factorio Blueprint Analysis </h1>
    </div>

    <!-- Blueprint data -->
    <div class="data pannel">
      <h2>Blueprint</h2>
      <div
        id="data"
        v-if="analysedBlueprint !== null"
      >
        <!-- name -->
        <div id="blueprintName">
          <u>Name:</u>
          <b style="padding-left: 10px;">
            {{ analysedBlueprint.blueprint.label }}
          </b>
        </div>
        <!-- description -->
        <div
          id="blueprintDescription"
          v-if="analysedBlueprint.blueprint.description"
        >
          <u>Description:</u>
          {{ analysedBlueprint.blueprint.description }}
        </div>
        <!-- icons -->
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
        <!-- Consumed items -->
        <div
          id="consumedItems"
          v-if="analysedBlueprint.blueprint.items_input"
        >
          <u>Consumed items:</u>
          <br>
          <div
            class="item"
            v-for="(item, i) in Object.keys(analysedBlueprint.blueprint.items_input)"
            :key="i"
          >
            {{ item }}: <b>{{ analysedBlueprint.blueprint.items_input[item] }}/s</b>
          </div>
        </div>
        <!-- Produced items -->
        <div
          id="producedItems"
          v-if="analysedBlueprint.blueprint.items_output"
        >
          <u>Produced items:</u>
          <br>
          <div
            class="item"
            v-for="(item, i) in Object.keys(analysedBlueprint.blueprint.items_output)"
            :key="i"
          >
            {{ item }}: <b>{{ analysedBlueprint.blueprint.items_output[item] }}/s</b>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis parameters -->
    <div class="config pannel">
      <h2>Parameters</h2>
      <div
        id="parameters"
        v-if="parameters"
      >
        <div
          class="parameter"
          v-for="(para, i) in Object.keys(parameters)"
          :key="i"
        >
          {{ para }}: <b>{{ parameters[para]}}</b>
        </div>
      </div>
    </div>

    <!-- Analysis results -->
    <div
      class="graph"
      id="mynetwork"
    >
    </div>

    <!-- Buttons -->
    <div class="buttons pannel">
      <div id="buttons">
        <button
          class="mainBtn"
          @click="newIssue"
          title="Report an issue"
        >😥 Did something went wrong?</button>
        <button
          class="mainBtn"
          @click="copyResults()"
        >📋 Copy results</button>
        <button
          class="mainBtn"
          @click="downloadObjectAsJson(analysedBlueprint, 'analysed_blueprint')"
        >📥 Export Json</button>
      </div>
      <div id="menuEnd">
        {{ version }}
        <p-button
          id="github"
          icon="pi pi-github"
          class="p-button-secondary"
          @click="openGithub"
        >
        </p-button>
      </div>
    </div>
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
      parameters: null,
      version,
    }
  },
  mounted() {
    this.analysedBlueprint = analysisStore.analysedBlueprint
    this.parameters = analysisStore.parameters
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
            size: 10,
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
    downloadObjectAsJson(exportObj, exportName) {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", exportName + ".json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    copyResults() {
      const text = JSON.stringify(this.analysedBlueprint, null, 2);
      navigator.clipboard.writeText(text);
      this.$toast.add({ severity: 'success', summary: 'Results copied', detail: "The blueprint results has been copied to your clipboard", life: 3000 });
    },
  },
}
</script>

<style scoped>
.pannel {
  margin: 7px;
  padding: 9px;
}

#analysis {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 70px 3.9fr 1fr auto;
  grid-auto-flow: row;
  grid-template-areas:
    "header header"
    "data graph"
    "config graph"
    "config buttons";
  width: 100%;
  height: 99%;
}



.header {
  grid-area: header;
  display: flex;
  align-items: stretch;
  gap: 30px;
}

.header h1 {
  align-items: center;
  display: flex;
  margin: 0;
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
  overflow: auto;
}

#data {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#blueprintIcons {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

#blueprintIcons img {
  width: 40px;
  height: 40px;
}

.config {
  grid-area: config;
}

.graph {
  grid-area: graph;
  /* border: 1px solid lightgray; */
}

.buttons {
  grid-area: buttons;
  display: flex;
}

#buttons {
  display: flex;
  gap: 10px;
  flex: 1;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.buttons button {
  min-height: 40px;
}

/* Grid for small screens */
@media only screen and (max-width: 600px) {
  #analysis {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 70px auto 3.9fr 1fr auto;
    grid-auto-flow: row;
    grid-template-areas:
      "header"
      "data"
      "graph"
      "config"
      "buttons";
  }

  #mynetwork {
    max-height: 40vh;
  }

  .buttons {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px
  }
}
</style>