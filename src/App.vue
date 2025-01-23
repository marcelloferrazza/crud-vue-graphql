<template>
  <v-app>
    <Header>

</Header>
    <v-main>

      
      <router-view />
    </v-main>
    <AppFooter></AppFooter>

  </v-app>
</template>

<script >
  import AppFooter from "./components/AppFooter.vue"
  export default { 
    name: 'App',

    components: { 
      AppFooter
    }
  }
</script>
