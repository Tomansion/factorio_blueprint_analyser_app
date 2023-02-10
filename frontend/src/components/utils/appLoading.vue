<template>
  <div id="loading">
    <Transition>
      <div
        class="request"
        v-if="isLoading"
      >
        <div class="top">
          <div class="name">Loading</div>
          <div class="loader" />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { analysisStore } from '@/stores/analysis'

export default {
  name: "appLoading",
  data: () => {
    return {};
  },
  created() { },
  methods: {
    removeMsg(msg) {
      this.$store.commit("removeMessage", msg);
    },
  },
  computed: {
    isLoading() {
      const store = analysisStore();
      return store.isLoading;
    },
  },
};
</script>

<style scoped>
#loading {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 10;

  overflow: hidden;
}

/* requests */
.request {
  display: flex;
  flex-direction: column;

  margin-right: 8px;
  margin-bottom: 4px;
  padding: 4px;
  color: #fff;
  background-color: var(--info);
  transition: all 0.1s;

  overflow: hidden;
}

.request .top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.request .top .name {
  padding-right: 5px;
}

.request .top .loader {
  border: 2px solid #f3f3f3;
  /* Light grey */
  border-top: 3px solid #3498db;
  /* Blue */
  border-right: 3px solid #3498db;
  /* Blue */
  border-radius: 100%;
  width: 10px;
  height: 10px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>