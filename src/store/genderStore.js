import { defineStore } from 'pinia'

export const useGenderStore = defineStore('gender', {
  state: () => ({
    currentGender: {
      id: '',
      name: '',
      nameTranslate: '',
    },

    allGenders: []
  }),

  persist: true,

  getters: {
    hasGender: (state) => !!state.currentGender.id,
  },

  actions: {
    setGender(gender) {
      this.currentGender = gender;
      console.log(this.currentGender.id)
    },

    setAllGenders(genders) {
      this.allGenders = genders
    },
    
  },
})
