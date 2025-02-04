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
      // Objeto de filme a ser criado (pode ser vazio)
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
        // Dispara o evento "save" para o pai com o filme criado
        this.$emit('save', newMovie)
        console.log("newMovie", newMovie);

      },
      onClose() {
        // Dispara o evento "close" para o pai
        this.$emit('close')
      }
    }
  }
  </script>
  