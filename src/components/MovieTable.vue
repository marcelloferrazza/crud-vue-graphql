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
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                class="mb-2"
                color="primary"
                dark
                v-bind="props"
              >
                Novo filme 
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }} - {{ pageTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      md="6"
                      sm="10"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Nome do filme"
                      ></v-text-field>
                    </v-col>
                  
                    <v-col
                      cols="12"
                      md="6"
                      sm="10"
                    >
                      <v-select
                      v-if="gender==='all'"
                        v-model="editedItem.type"
                        :items="genders"
                        label="Selecione o gênero"
                      ></v-select>
                    </v-col>
                   
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
          @click="editItem(item)"
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
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </template>

<script>
import { translateType } from '@/utils/translate';
  export default {
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
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          title: 'Nome do filme',
          align: 'start',
          sortable: false,
          key: 'name',
        },
        { title: 'Gênero', key: 'type' },
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

    genders: [
    'Ação',
    'Aventura',
    'Comédia',
    'Drama',
    'Terror',
    'Ficção Científica',
    'Romance',
    'Thriller',
    'Fantasia',
    'Documentário'
  ],
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo filme' : 'Editar filme'
      
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()


    },

    methods: {
      initialize () {
        const allMovies = [
          {
            name: 'Exorcista',
            type: 'horror',
            id: 1,
          },
          {
            name: 'teste',
            type: 'comedy',
            id: 2,
          },
          {
            name: 'superbad',
            type: 'comedy',
            id: 3,
          },
          {
            name: 'Velozes e furiosos',
            type: 'action',
            id: 3,
          },
          {
            name: 'Avatar',
            type: 'fiction',
            id: 3,
          },
          {
            name: 'Star Wars',
            type: 'fiction',
            id: 3,
          },
        ]

        
        this.movies = allMovies.reduce((acc, movie) => {
    if (this.gender === 'all' || this.gender === movie.type) {
      movie.type = translateType(movie.type);
      acc.push(movie);
      
    }
    return acc;
  }, []);
    
 

        
      },

      editItem (item) {
        this.editedIndex = this.movies.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.movies.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.movies.splice(this.editedIndex, 1)
        this.closeDelete()
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
