<template>
    <v-btn
        class="ma-2"
        color="orange-darken-2"
        to="/"
      >
        <v-icon
          icon="mdi-arrow-left"
          start
        ></v-icon>
        Voltar
      </v-btn>
        
    <v-data-table
      :headers="headers"
      :items="movies"
      :loading="loading"
      :sort-by="[{ key: '', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-btn
          class="mb-2"
          color="primary"
          dark
          @click="openAdd"
        >
          Novo filme
        </v-btn>
         
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Tem certeza que deseja deletar esse item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          class="me-2"
          size="small"
          @click="openEdit(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="inicialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <AddMovie :dialog="dialogAdd" @update:dialog="dialogAdd = $event" :pageTitle="pageTitle" :gender="gender" :genders="genders" :movie-to-add="newMovie" @save="saveAdd" @close="closeAdd" />
  <EditMovie  :dialog="dialogEdit"  @update:dialog="dialogEdit = $event"  :pageTitle="pageTitle"  :gender="gender" :genders="genders" :movie-to-edit="editedItem" @save="save" @close="closeEdit"/>

  </template>

<script>
import GET_MOVIES from '@/graphql/queries/getMovies';
import GET_MOVIES_BY_GENDER from '@/graphql/queries/getMoviesByGender';
import SAVE_MOVIE_MUTATION from '@/graphql/mutations/saveMovie';
import DELETE_MOVIE_MUTATION from '@/graphql/mutations/delMovie'
import { useGenderStore } from '@/store/genderStore';
import AddMovie from './AddMovie.vue';
import EditMovie from './EditMovie.vue';

  export default {

components: { 
  AddMovie,
  EditMovie
},
    props: {
      pageTitle: {
        type: String,
        default:''
      },
      gender: {
        type: String,
        default:''
      }

    },

    data: () => ({
      genderId: '',
      dialogAdd: false,
      dialogDelete: false,
      dialogEdit: false,
      headers: [
        {
          title: 'Nome do filme',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Gênero', key: 'type.nameTranslate' },
        { title: 'ID', key: 'id' },
        { title: 'Ações', key: 'actions', sortable: false },
      ],
      movies: [],

      editedIndex: -1,
      editedItem: {
        name: '',
        type:'',
        id: 0,
      },
      defaultItem: {
        name: '',
        type: '',
        id: 0,
      },

      newMovie: {
        name: '',
        type: '',
        id: 0
      },

      error: null,
      loading: false,

    genders: [],
  }),

    computed: {
      genderStore() { 
        return useGenderStore()
      }
    },

    watch: {
      dialogDelete (val) {
        val || this.closeDelete()
      },
      'genderStore.currentGender.id': {
      immediate: true,        
      handler(newVal) {
        this.genderId = newVal   
      }
    }
    },

  apollo: {
  movies: {
    query() {
      return this.genderId == 1 ? GET_MOVIES : GET_MOVIES_BY_GENDER
    },
    variables() {
      if (this.genderId == 1) {
        return {}  
      } else {
        return { "genderId": this.genderId }
      }
    },
    loadingKey: 'loading',
    error(error) {
      console.error('Erro na requisição:', error)
      this.error = error
    },
    update(data) {
      if (this.genderId == 1) {
        return data.allMovies
      } else {
        return data.moviesByGender
      }
    },

  },
  
},

    methods: {
      openAdd() {
   
      this.newMovie = { ...this.defaultItem };
      this.dialogAdd = true;
    },

    async saveAdd(newMovie) {
         
          try { 
            const response = await this.$apollo.mutate({ 
              mutation: SAVE_MOVIE_MUTATION,
              variables: { 
                
  "movie": {
    "name": newMovie.name,
    "type": this.genderId
  }

              }
            })
            await this.$apollo.queries.movies.refetch();
          } catch(error) {
            console.log("Erro ao adicionar filme:", error)
          }
              
    },

    closeAdd() {
      console.log('Fechou diálogo de adicionar');
    },

    saveEdit(updatedMovie) {
      Object.assign(this.movies[this.editedIndex], updatedMovie);
    },
    // Evento "close" vindo do <EditMovie>
    closeEdit() {
      console.log('Fechou diálogo de edição');
    },

    openEdit(item) {
      this.editedIndex = this.movies.indexOf(item);
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },

      deleteItem (item) {
        this.editedIndex = this.movies.indexOf(item);
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

     async deleteItemConfirm (editedItem) {         
          try { 
            const response = await this.$apollo.mutate ({ 
              mutation: DELETE_MOVIE_MUTATION,
              variables: {
    "delMovieId":this.editedItem.id
}
            })
            this.closeDelete();
            await this.$apollo.queries.movies.refetch();
          } catch (error) { 
            console.log("Erro ao deletar:", error);
          }
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.movies[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.id = this.movies.length ? Math.max(...this.movies.map(m => m.id)) + 1 : 1
          this.movies.push(this.editedItem)
          
        }
        this.close()
      },

     
    },
  }
</script>

<style>

</style>
