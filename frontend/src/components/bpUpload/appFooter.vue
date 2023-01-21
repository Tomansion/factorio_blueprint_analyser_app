<template>
  <div
    id="footer"
    class="pannel"
  >
    <a
      href="https://tomansion.fr"
      target="_blank"
    >
      My other projects
    </a>
    <span style="flex:1"></span>
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

</template>

<script>
import packageJson from "../../../package.json";

export default {
  data() {
    const version = packageJson.version;
    return {
      version,

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
#footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 5px 5px 5px 20px;
}

#version {}

#github {
  margin-left: 20px;
}
</style>