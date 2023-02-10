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
    <button
      id="github"
      icon="pi pi-github"
      class="mainBtn"
      @click="openGithub"
    >
      <img src="https://img.icons8.com/windows/32/null/github.png" />
    </button>
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

#version {
  font-weight: bolder;
  color: rgba(211, 211, 211, 0.533);
}

#github {
  padding: 4px;
  margin-left: 20px;
  border-radius: 5px;
}
</style>