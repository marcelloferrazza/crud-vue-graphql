<template>
  <v-footer
    class="custon-footer bg-indigo-lighten-1 text-center d-flex flex-column my-1"
  >
    
    <div class="pt-0">
      Listagem de filmes cadastrados. CRUD utilizando vuetify, graphql, knex, dockers @2025
    </div>

    <v-divider></v-divider>

    <div>
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div>
  </v-footer>

  
</template>
<script>
  export default {
    data: () => ({
      
    }),
  }
</script>


<style> 
.custon-footer { 
  max-height: 60px !important;
  padding: 8px;
}
</style>