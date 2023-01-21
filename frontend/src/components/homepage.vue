<template>
  <div id="homepage">
    <!-- Text info and title -->
    <div id="info">
      <TextDesc />
    </div>

    <!-- Dashboard content and footer -->
    <div id="dashboard">
      <blueprintUpload />
    </div>

  </div>
</template>

<script>
import blueprintUpload from './bpUpload/blueprintUpload.vue'
import TextDesc from './info/TextDesc.vue'

export default {
  name: 'Home-page',
  components: { TextDesc, blueprintUpload },
}
</script>

<style scoped>
#homepage {
  height: 100vh;
  display: flex;
  padding: 30px;
  gap: 40px;
}

#info {
  flex: 1;
  display: flex;
  justify-content: center;
}

#dashboard {
  flex: 1.3;
  display: flex;
  flex-direction: column;
}

#content {
  flex: 1;
  background-color: rgb(69, 69, 106);
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  border-radius: 15px;
}

/* Style for small screens */
@media only screen and (max-width: 1000px) {
  #homepage {
    flex-direction: column;
    padding: 20px;
  }

  #info {
    padding: 0;
  }

  #dashboard {
    flex: 0.8;
  }
}

/* Style for extra small screens */
@media only screen and (max-width: 700px) {
  #homepage {
    padding: 10px;
  }

  #info {
    padding: 0;
  }

  #dashboard {
    flex: 0.8;
  }
}
</style>