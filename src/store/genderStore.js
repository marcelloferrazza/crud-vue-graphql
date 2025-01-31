import { defineStore } from 'pinia'

export const useGenderStore = defineStore('gender', {
  state: () => ({
    currentGenderId: ''     
  }),

  persist: true,

  getters: {
    hasGender: (state) => !!state.currentGenderId,
  },

  actions: {
    setGenderId(id) {
      console.log(id)
      this.currentGenderId = id
    },
  },
})
