<!-- AddMovie.vue -->
<template>
    <MovieDialog
      :dialog="dialog"
      @update:dialog="$emit('update:dialog', $event)" 
      :gender="gender"
      :genders="genders"
      :pageTitle="pageTitle"
      formTitle="Novo filme"
      :movie="movieToAdd" 
      @save="onSave"
      @close="onClose"
    />
  </template>
  
  <script>
  import MovieDialog from '@/components/MovieDialog.vue'
  
  export default {
    name: 'AddMovie',
    components: { MovieDialog },
  
    emits: ['update:dialog', 'save', 'close'],
  
    props: {
      
      dialog: {
        type: Boolean,
        default: false
      },
      gender: {
        type: String,
        default: 'all'
      },
      genders: {
        type: Array,
        default: () => ([
          
        ])
      },
      pageTitle: {
        type: String,
        default: ''
      },

      movieToAdd: {
        type: Object,
        default: () => ({
          name: '',
          type: '',
          id: 0
        })
      }
    },
  
    methods: {
      onSave(newMovie) {
    
        this.$emit('save', newMovie)
        console.log("newMovie", newMovie);

      },
      onClose() {
    
        this.$emit('close')
      }
    }
  }
  </script>
  