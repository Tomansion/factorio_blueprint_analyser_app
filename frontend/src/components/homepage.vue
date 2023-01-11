<template>
  <div id="homepage">
    <!-- Text info and title -->
    <div id="info">
      <TextDesc />
    </div>

    <!-- Dashboard content and footer -->
    <div id="dashboard">
      <div id="content">
        <blueprintUpload />
      </div>
      <div id="footer">
        <div id="version">
          {{ version }}
        </div>
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
import blueprintUpload from './bpUpload/blueprintUpload.vue'
import TextDesc from './info/TextDesc.vue'
import packageJson from "../../package.json";

export default {
  name: 'Home-page',
  components: { TextDesc, blueprintUpload },
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
  height: 100vh;
  display: flex;
  padding: 30px;
}

#info {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 50px;
  padding-top: 30px;
}

#dashboard {
  flex: 1.3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
}

#content {
  flex: 1;
  background-color: rgb(69, 69, 106);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  border-radius: 15px;
}

#footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: lightcyan;
  border-radius: 15px;
  color: black;
  height: 100px;
  padding: 15px;
}

#version {
  font-size: 1.5em;
  font-weight: bold;
}

#github {
  margin-left: 20px;
  transform: scale(1.5);
}
</style>