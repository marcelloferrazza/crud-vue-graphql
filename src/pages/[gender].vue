<template>
    <div>
      <h1>Filmes do gênero: {{ translateGender }}</h1>
      <MovieTable :gender="gender"/>
    </div>
  </template>
  
  <script>
  import MovieTable from "@/components/MovieTable.vue";
  import { translateType } from "@/utils/translate";
  
  export default {
    name: "MoviesBygender",
   
    watch: {
      "$route.params.gender": {
        immediate: true,
        handler(newgender) {
          this.gender = newgender;
        },
      },
    },
    data() {
      return {
        gender: this.$route.params.gender, 
        translateGender: ''
      };
    },

    mounted(){
        this.translate();
    },

    methods: { 
        translate(){ 
         
          this.translateGender = translateType(this.gender);
        }
    }
  };
  </script>
  