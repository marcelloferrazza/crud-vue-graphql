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
      <v-toolbar-title></v-toolbar-title>
      <v-spacer>
        <v-btn 
          size="x-large"  
          variant="tonal" 
          :ripple="false" 
          color="info" 
          rounded 
          @click="openGender(type)"
        >   
          {{ type.nameTranslate }}
        </v-btn>
      </v-spacer>
      <v-btn icon>
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import GET_GENDERS from '@/graphql/queries/getGenders';
import { useGenderStore } from '@/store/genderStore';
export default {

  data() {
    return {
      types: [], 
      loading:false,
      error:null, 
    };
  },
  methods: {
    toolbarBackground(type) {
      const fileName = type.name
      try {
        const imageSrc = new URL(`../assets/genders/${fileName}.png`, import.meta.url).href;
        return {
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        };
      } catch (error) {
        console.error("Erro ao carregar imagem para:", type, error);
        return {}; 
      }
    },

    openGender(type) {
      const genderStore = useGenderStore();
      genderStore.setGenderId(type.id);
      console.log(type.id)
      this.$router.push({ path: `/${type.name}` 
      }); 
    }
  },

  apollo: { 
      types: { 
        query: GET_GENDERS,
        loadingKey:'loading',
        error(error) {
          console.log('Erro na requisição:', error)
          this.error = error;
        },
        update(data) {
        
  this.types = data.genders;
  return this.types;
  
}       
      },  
         
    },
};
</script>

<style>
.custom-toolbar {
  height: 150px !important; 
  margin-bottom: 20px;
  transition: transform 0.3s ease, height 0.3s ease;
  border-radius: 8px;
}



.custon-toolbar img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.custom-toolbar:hover {
  height: 150px !important; 
  transform: scale(1.05); 
}
</style>
