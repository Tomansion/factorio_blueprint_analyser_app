import { defineStore } from 'pinia'

export const analysisStore = defineStore('counter', {
  state: () => {
    return {
      analysedBlueprint: null,
      parameters: null,

      isLoadding: false,
      messages: [], // List of messages for the user
      requests: [], // List of messages for the user
    }
  },
  actions: {
    setLoading(val) {
      this.isLoadding = val
    },
    // message
    sendMessage(msg) {
      msg.id = Math.random()
      this.messages.push(msg)
      setTimeout(() => {
        this.messages = this.messages.filter(m => m.id != msg.id)
      }, 5000)
    },
    removeMessage(id) {
      this.messages = this.messages.filter(m => m.id != id)
    },
  },

})
