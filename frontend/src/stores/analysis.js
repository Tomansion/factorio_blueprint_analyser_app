import { defineStore } from 'pinia'

export const analysisStore = defineStore('counter', {
  state: () => {
    return {
      analysedBlueprint: null,
      parameters: null
    }
  },
  actions: {},
})
