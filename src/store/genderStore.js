import { defineStore } from 'pinia'

export const useGenderStore = defineStore('gender', {
  state: () => ({
    currentGender: {
      id: '',
      name: '',
      nameTranslate: '',
    }
  }),

  persist: true,

  getters: {
    hasGender: (state) => !!state.currentGender.id,
  },

  actions: {
    setGender(gender) {
      console.log(gender)
      this.currentGender = gender;
      console.log(this.currentGender)
    },
  },
})
