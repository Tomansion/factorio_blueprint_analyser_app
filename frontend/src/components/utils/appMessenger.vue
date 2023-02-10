<template>
  <div id="Messenger">
    <transition-group
      id="list"
      name="list"
      tag="p"
    >
      <div
        :class="'message ' + msg.title"
        v-for="msg in messages"
        :key="msg.id"
        @click="removeMsg(msg.id)"
      >
        <h4
          class="typeName"
          v-if="msg.title !== 'blank'"
        >{{ msg.title }}</h4>
        <pre class="text">{{ msg.msg }}</pre>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { analysisStore } from '@/stores/analysis'

export default {
  name: "appMessenger",
  data: () => {
    return {};
  },
  methods: {
    removeMsg: function (id) {
      const store = analysisStore();
      store.removeMessage(id);
    },
  },
  computed: {
    messages() {
      const store = analysisStore();
      return store.messages;
    },
  },
  watch: {
    messages() { },
  },
};
</script>

<style scoped>
#Messenger {
  z-index: 10;
  position: fixed;
  bottom: 0;
  max-width: 100vw;
  overflow: hidden;
}

#list {
  margin-bottom: 0;
  margin-left: 15px;
  display: flex;
  flex-direction: column-reverse;
  align-items: flex-start;
}

.message {
  cursor: pointer;

  margin-bottom: 1vh;
  padding: 10px 20px 10px 20px;

  border-left: solid 1vh;
  color: #fff;
  text-align: left;
  transition: filter 0.1s;
  overflow: hidden;
  background-color: var(--info);
}

.message:hover {
  filter: brightness(90%);
}

.text {
  font-size: 1.1em;
  padding: 0;
  margin: 0;
}

.typeName {
  font-size: 1.2em;
  margin: 0 0 7px 0;
}

/* Transition */
.list-enter-active,
.list-leave-active {
  transition: opacity 1s, height 1s;
}

/* .list-leave-active below version 2.1.8 */
.list-enter,
.list-leave-to {
  opacity: 0;
}

/* All colors */
.message.info {
  background-color: var(--info);
  border-color: var(--infoDark);
}

.message.blank {
  background-color: var(--blank);
  border-color: var(--blankDark);
}

.message.success {
  background-color: var(--success);
  border-color: var(--successDark);
}

.message.warning {
  background-color: var(--warning);
  border-color: var(--warningDark);
}

.message.error {
  background-color: var(--danger);
  border-color: var(--dangerDark);
}
</style>