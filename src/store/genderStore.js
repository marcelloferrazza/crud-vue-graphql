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
      console.log(gender)
      this.currentGender = gender;
      console.log(this.currentGender)
    },

    setAllGenders(genders) {
      this.allGenders = genders
      console.log("Allgenderstore:", this.allGenders)
    },
    removeGender() {
      this.allGenders.splice(0, 1);
    },
  },
})
