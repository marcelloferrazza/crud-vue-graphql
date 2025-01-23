<template>
    <div>
      <v-toolbar
        v-for="type in types"
        :key="type"
        class="custom-toolbar"
        :style="toolbarBackground(type)"
        dark
        prominent
      >
        <v-toolbar-title>
            
         </v-toolbar-title>
        <v-spacer>
            <v-btn 
            size="x-large"  
            variant="tonal" 
            :ripple="false" 
            color="info" 
            rounded="" 
            @click="openGender(type)"
            >          
            {{ type }}
</v-btn>
        </v-spacer>
        <v-btn icon>
          <v-icon>mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        types: ["Todos", "Comédia", "Ação", "Ficção", "Terror"],
        fileNames: {
        Todos:"all",
          Comédia: "comedy",
          Ação: "action",
          Ficção: "fiction",
          Terror: "horror",
        }
      };
    },
    methods: {
      toolbarBackground(type) {
        const fileName = this.fileNames[type];
        // Se estiver usando Webpack + Vue CLI:
        const imageSrc = new URL(`../assets/genders/${fileName}.png`, import.meta.url).href;

  
        // Opcionalmente, adicione `backgroundSize` ou `backgroundPosition`
        // conforme sua necessidade
        return {
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'cover',
        }

      
      },
      openGender(type) {
            const fileName = this.fileNames[type];
            console.log("tipo recebido foi", type)
			this.$router.push({
				path: `/${fileName}`
			});           
		}
    }
  };
  </script>
  
  <style>
  .custom-toolbar {
    height: 150px !important;
    margin-bottom: 20px;
  }

 
  </style>
  