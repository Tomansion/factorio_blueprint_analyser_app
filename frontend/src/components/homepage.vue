<template>
  <div id="homepage">
    <!-- Tool bar -->
    <p-toolbar>
      <template #start>
        <h1>Factorio blueprint analyser</h1>
      </template>

      <!-- Github link -->
      <template #end>
        {{version}}
        <p-button
          id="github"
          icon="pi pi-github"
          class="p-button-secondary"
          @click="openGithub"
        >
        </p-button>
      </template>
    </p-toolbar>

    <!-- Introduction -->
    <p-panel
      header="Introduction"
      class="infoPanel"
      :toggleable="true"
      v-model:collapsed="introCollapsed"
      @toggle="devCollapsed = true"
    >
      <p>
        The Factorio blueprint analyser is a tool to help you find the bottleneck in a supplychain. <br>
        <br>
        <b>Features: </b><br>
      <ul>
        <li>Estimate the blueprint item input:</li>
        <ul>
          <li>Item list</li>
          <li>Quantity per second</li>
          <li>Entrance location on the blueprint</li>
        </ul>
        <li>Estimate the blueprint item output:</li>
        <ul>
          <li>Item list</li>
          <li>Quantity per second</li>
          <li>Exit location on the blueprint</li>
        </ul>
        <li>Estimate the usage of each entities (inserters, belts, assembly machines, ...)</li>
        <ul>
          <li>Transported / produced items for each entities</li>
          <li>Usage of the entity in percentage</li>
          <li>Bottleneck identification</li>
        </ul>
        <li>Json results export</li>
      </ul>
      <br>
      To begin, paste your blueprint in the text area below or upload your blueprint.<br>
      <br>
      </p>
    </p-panel>

    <!-- Development -->
    <p-panel
      header="Development"
      class="infoPanel"
      :toggleable="true"
      v-model:collapsed="devCollapsed"
      @toggle="introCollapsed = true"
    >
      <p>
        The tool is still in development, so please report any bugs by creating an issue
        <a href="https://github.com/tomansion/factorio_blueprint_analyser_app/issues">here</a><br>
        <br>
        This project is part of an internship at the <b>Michigan State University</b> for the <b>Factorio Must Grow project</b>.
        To know more about the project:
      <ul>
        <li>Watch the intership final presentation on
          <a href="https://youtu.be/q2Bx-8wbsvk?t=2162">Youtube</a>
        </li>
        <li>Watch The Factory Must Grow: Automation in Factorio presentation on
          <a href="https://www.youtube.com/watch?v=9ie01GLGB5s">Youtube</a>
        </li>
        <li>
          Join the AI in Factorio
          <a href="https://join.slack.com/t/aiinfactorio/shared_invite/zt-1i93131b5-~qucCV~PYmrj8VP5m4RGFQ">Slack channel</a> <br>
        </li>
        <li>Contact <a href="mailto:reidken1@msu.edu">reidken1@msu.edu</a></li>
      </ul>
      <br>
      </p>
    </p-panel>

    <!-- Main content -->
    <div id="content">
      <blueprintUpload />
    </div>
  </div>
</template>

<script>
import blueprintUpload from './bpUpload/blueprintUpload.vue'
import packageJson from "../../package.json";

export default {
  name: 'Home-page',
  components: { blueprintUpload },
  data() {
    const version = packageJson.version;
    return {
      version,
      introCollapsed: true,
      devCollapsed: true,
    }
  },
  methods: {
    openGithub() {
      window.open("https://github.com/tomansion/factorio_blueprint_analyser_app/", '_blank').focus();
    }
  }
}
</script>

<style scoped>
#homepage {
  height: 88vh;
  display: flex;
  flex-direction: column;
}

/* Toolbar */
.p-toolbar {
  width: 100%;
}
#github {
  margin-left: 10px;
}

.p-toolbar h1 {
  color: white;
  padding: 0;
  margin: 0;
  font-size: 1.5em;
}

.p-toolbar .p-button {
  margin-right: 0.5em !important;
}

.p-toolbar-group-right {
  color: var(--text-color);
  gap: 0.5em;
}

/* Introduction */
/* .infoPanel {} */

/* Content */
#content {
  padding: 60px;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>