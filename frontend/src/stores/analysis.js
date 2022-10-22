import { defineStore } from 'pinia'

export const analysisStore = defineStore('counter', {
  state: () => {
    return {
      analysedBlueprint: null
    }
  },
  actions: {
    setAnalysedBlueprint(blueprint) {
      this.analysedBlueprint = blueprint
    }
  },
})
