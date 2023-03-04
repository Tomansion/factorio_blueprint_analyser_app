<template>
  <div id="analysis">
    <div class="header pannel">
      <button
        class="mainBtn"
        @click="$router.push('/')"
      >🡠 New analysis</button>
      <h1> Factorio Blueprint Analysis </h1>
      <!-- Github link & version -->
      <div id="version">
        {{ version }}
        <button
          id="github"
          class="mainBtn"
          @click="openGithub"
        >
          <img src="https://img.icons8.com/windows/32/null/github.png" />
        </button>
      </div>
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
        <!-- icons -->
        <div id="blueprintIcons">
          <img
            class="icon"
            v-for="(icon, i) in analysedBlueprint.blueprint.icons"
            :key="i"
            :src="itemNameToIcon(icon.signal.name)"
          />
        </div>
        <!-- description -->
        <div
          id="blueprintDescription"
          v-if="analysedBlueprint.blueprint.description"
        >
          <u>Description:</u>
          {{ analysedBlueprint.blueprint.description }}
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
            {{ item }}: <b>{{ beautifulNumber(analysedBlueprint.blueprint.items_input[item]) }}/s</b>
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
            {{ item }}: <b>{{ beautifulNumber(analysedBlueprint.blueprint.items_output[item]) }}/s</b>
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
          {{ para }}: <b>{{ parameters[para] }}</b>
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
    <div
      id="buttonsPannel"
      class="buttons pannel"
    >
      <div id="buttons">
        <button
          class="mainBtn red"
          @click="newIssue"
          title="Report an issue"
        >has something gone wrong?</button>
        <button
          class="mainBtn"
          @click="copyResults()"
        >Copy results</button>
        <button
          class="mainBtn"
          @click="downloadResults()"
        >Download results</button>
      </div>
      <div id="menuEnd">
        <!-- Restart analysis tip -->
        <div
          id="interactionTip"
          v-if="entitiesToRemove.length === 0"
        >
          <b>Tip !</b> Remove entities from your blueprint by clicking on them
        </div>
        <button
          id="restartAnalysis"
          class="arrowBtn"
          @click="restartAnalysis"
          v-else
        >
          Restart analysis
        </button>
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
import axios from 'axios'

export default {
  name: 'analysis-page',
  data() {
    const version = packageJson.version;
    return {
      analysedBlueprint: null,
      parameters: null,
      version,

      // Blueprint modification
      entitiesToRemove: [],
    }
  },
  mounted() {
    const store = analysisStore()
    this.analysedBlueprint = store.analysedBlueprint
    this.parameters = store.parameters
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
      const container = document.getElementById("mynetwork");
      // Remove old graph
      container.innerHTML = "";
      this.entitiesToRemove = [];

      // Create a vis-network graph
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
          keyboard: { enabled: true },
          selectable: true,
        },
        physics: false,
        nodes: {
          shape: "image",
          font: {
            size: 20,
            color: "#ffffff",
            strokeWidth: 5,
            strokeColor: "black",
          },
          color: {
            hover: { background: "grey" },
            highlight: {
              background: "transparent", border: "transparent"
            },
          },
        },
        edges: {
          color: "#cccc05",
          arrows: {
            to: {
              scaleFactor: 0.8,
            },
          },
          dashes: true,
          arrowStrikethrough: false,
          width: 0.5
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
            opacity: 0.8,
            color: {
              border: "white",
              background: "black",
            },
            borderWidth: 0,
            imagePadding: 1,
            shapeProperties: { useBorderWithImage: true },
          },
          recipe: {
            action: {
              hover: false,
              selectable: false,
            },
            opacity: 0.7,
            color: {
              background: "black",
            },
            borderWidth: 0,
            imagePadding: 8,
            shapeProperties: { useBorderWithImage: true },
            selectable: false,
          },
          legend: {
            interaction: {
              hover: false,
              selectable: false,
            },
            font: {
              size: 15,
              color: "grey",
              strokeWidth: 0,
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

        // Set the cursor to pointer when hovering over an entity
        if (e.node.includes("legend")) return
        if (e.node.includes("recipe")) return
        if (e.node.includes("transported")) return
        network.canvas.body.container.style.cursor = 'pointer'
      });
      // We want to remove the label on mouse out
      network.on("blurNode", (e) => {
        if (e.node.includes("legend")) return
        nodesDataset.update({ id: e.node, label: "" });

        // Set the cursor to default
        network.canvas.body.container.style.cursor = 'default'
      });
      // We want to mark an entity as selected when clicked
      network.on("click", (e) => {
        if (e.nodes.length === 0) return
        if (e.nodes[0].includes("legend")) return
        if (e.nodes[0].includes("recipe")) return
        if (e.nodes[0].includes("transported")) return
        const node = nodesDataset.get(e.nodes[0]);
        const nodeNumber = parseInt(e.nodes[0])
        if (node.selected) {
          nodesDataset.update({
            id: e.nodes[0],
            selected: false,
            opacity: 1,
          });
          this.entitiesToRemove = this.entitiesToRemove.filter((entity) => entity !== nodeNumber);
        } else {
          nodesDataset.update({
            id: e.nodes[0],
            selected: true,
            opacity: 0.1,
          });
          this.entitiesToRemove.push(nodeNumber);
        }
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
    downloadResults() {
      var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.analysedBlueprint, null, 2));
      var downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "analysed_blueprint.json");
      document.body.appendChild(downloadAnchorNode); // required for firefox
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    },
    copyResults() {
      const text = JSON.stringify(this.analysedBlueprint, null, 2);
      navigator.clipboard.writeText(text);

      const store = analysisStore()
      store.sendMessage({
        title: "success",
        msg: "Results copied to clipboard"
      })
    },
    beautifulNumber(number) {
      return ansUtil.beautifulNumber(number)
    },

    restartAnalysis() {
      const newBlueprint = {
        blueprint: {
          entities: [],
          icons: this.analysedBlueprint.blueprint.icons,
          item: this.analysedBlueprint.blueprint.item,
          label: this.analysedBlueprint.blueprint.label,
          version: this.analysedBlueprint.blueprint.version,
        }
      }
      // Add the entities that were not unselected
      this.analysedBlueprint.blueprint.entities.forEach(entity => {
        if (!this.entitiesToRemove.includes(entity.entity_number)) {
          newBlueprint.blueprint.entities.push(entity)
        }
      })

      // Start the analysis
      const store = analysisStore();
      store.isLoading = true
      axios.post('analysis', { blueprint: JSON.stringify(newBlueprint), parameters: this.parameters })
        .then((response) => {
          // Analysis successfull !
          this.analysedBlueprint = response.data

          // Update the graph
          this.createGraph()
        }).catch((error) => {
          // Analysis failed
          console.log(error);
          if (error.response && error.response.data && error.response.data.error)
            store.sendMessage({
              title: "error",
              msg: error.response.data.error,
            })
          else
            store.sendMessage({
              title: "error",
              msg: "Unknown error, please create an issue on the github repository"
            })

        }).finally(() => {
          store.isLoading = false
        })
    },
  }
}
</script>

<style scoped>
.pannel {
  margin: 7px;
  padding: 10px;
}

#analysis {
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: auto 3.9fr 1fr auto;
  grid-auto-flow: row;
  grid-template-areas:
    "header header"
    "data graph"
    "config graph"
    "config buttons";
  width: 100%;
  height: 100%;
}



.header {
  grid-area: header;
  display: flex;
  align-items: stretch;
  gap: 30px;
  padding: 6px;
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

#buttonsPannel {
  padding: 5px;
}

.buttons button {
  min-height: 30px;
  margin: 0;
}

#interactionTip {
  border: 1px solid rgba(211, 211, 211, 0.601);
  padding: 2px 10px 2px 10px;
  border-radius: 15px;
}

#restartAnalysis {
  min-height: 30px;
  width: 350px;
}

#version {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
}

#github {
  padding: 4px;
  margin-left: 10px;
  border-radius: 5px;
}

/* Grid for small screens */
@media only screen and (max-width: 1000px) {
  #analysis {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 3.9fr 1fr auto;
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