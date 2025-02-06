<template>
  <v-btn class="ma-2" color="orange-darken-2" to="/">
    <v-icon icon="mdi-arrow-left" start></v-icon>
    Voltar
  </v-btn>

  <v-data-table
    :headers="headers"
    :items="movies"
    :loading="loading"
    :sort-by="[{ key: '', order: 'asc' }]"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn class="mb-2" color="primary" dark @click="openAdd">
          Novo filme
        </v-btn>

        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Tem certeza que deseja deletar esse item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon class="me-2" size="small" @click="openEdit(item)">
        mdi-pencil
      </v-icon>
      <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
  </v-data-table>
  <AddMovie
    :dialog="dialogAdd"
    @update:dialog="dialogAdd = $event"
    :pageTitle="pageTitle"
    :gender="gender"
    :genders="genders"
    :movie-to-add="newMovie"
    @save="saveAdd"
    @close="closeAdd"
  />
  <EditMovie
    :dialog="dialogEdit"
    @update:dialog="dialogEdit = $event"
    :pageTitle="pageTitle"
    :gender="gender"
    :genders="genders"
    :movie-to-edit="editedItem"
    @save="save"
    @close="closeEdit"
  />
  <notifications animation-type="velocity" :animation="animation" />
</template>

<script>
import GET_MOVIES from "@/graphql/queries/getMovies";
import GET_MOVIES_BY_GENDER from "@/graphql/queries/getMoviesByGender";
import SAVE_MOVIE_MUTATION from "@/graphql/mutations/saveMovie";
import DELETE_MOVIE_MUTATION from "@/graphql/mutations/delMovie";
import UPDATE_MOVIE_MUTATION from "@/graphql/mutations/updateMovie";
import { useGenderStore } from "@/store/genderStore";
import AddMovie from "./AddMovie.vue";
import EditMovie from "./EditMovie.vue";
export default {
  components: {
    AddMovie,
    EditMovie,
  },
  props: {
    pageTitle: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
  },

  data: () => ({
    genderId: "",
    dialogAdd: false,
    dialogDelete: false,
    dialogEdit: false,
    headers: [
      {
        title: "Nome do filme",
        align: "start",
        sortable: false,
        key: "name",
      },
      { title: "Gênero", key: "type.nameTranslate" },
      { title: "ID", key: "id" },
      { title: "Ações", key: "actions", sortable: false },
    ],
    movies: [],

    editedIndex: -1,
    editedItem: {
      name: "",
      type: "",
      id: 0,
    },
    defaultItem: {
      name: "",
      type: "",
      id: 0,
    },

    newMovie: {
      name: "",
      type: "",
      id: 0,
    },

    error: null,
    loading: false,

    genders: [],
  }),

  computed: {
    genderStore() {
      return useGenderStore();
    },
    // Animação "velocity" da vue-notifications
    animation() {
      return {
        enter(element) {
          let height = element.clientHeight;
          return {
            height: [height, 0],
            opacity: [Math.random() * 0.5 + 0.5, 0],
          };
        },
        leave: {
          height: 1,
          opacity: 0,
        },
      };
    },
  },

  watch: {
    dialogDelete(val) {
      val || this.closeDelete();
    },
    "genderStore.currentGender.id": {
      immediate: true,
      handler(newVal) {
        
        console.log("Gênero mudou para:", newVal)
        this.genderId = newVal;
      },
    },
  },

  apollo: {
    movies: {
      query() {
        return this.genderId == 1 ? GET_MOVIES : GET_MOVIES_BY_GENDER;
      },
      variables() {
        if (this.genderId == 1) {
          return {};
        } else {
          return { genderId: this.genderId };
        }
      },
      loadingKey: "loading",
      error(error) {
        console.error("Erro na requisição:", error);
        this.error = error;
      },
      update(data) {
        if (this.genderId == 1) {
          return data.allMovies;
        } else {
          return data.moviesByGender;
        }
      },
    },
  },

  mounted() {
    this.setGenderList();

   console.log( this.genderStore.currentGender)
  },

  methods: {
    openAdd() {
      this.newMovie = { ...this.defaultItem };
      this.dialogAdd = true;
    },

    async saveAdd(newMovie) {
      try {
        const movieInput = {
          name: newMovie.name,
          type: this.genderId == 1 ? newMovie.type : this.genderId,
        };

        const response = await this.$apollo.mutate({
          mutation: SAVE_MOVIE_MUTATION,
          variables: { movie: movieInput },
        });
        await this.$apollo.queries.movies.refetch();
        this.$notify({
          title: "Sucesso!",
          text: "Filme cadastrado.",
          type: "success",
        });
      } catch (error) {
        console.log("Erro ao adicionar filme:", error);
        this.$notify({
          title: "Erro!",
          text: "Erro ao adicionar filme",
          type: "error",
        });
      }
    },

    closeAdd() {},

    saveEdit(updatedMovie) {
      Object.assign(this.movies[this.editedIndex], updatedMovie);
    },

    closeEdit() {},

    openEdit(item) {
      this.editedIndex = this.movies.indexOf(item);
      this.editedItem = { ...item };
      this.dialogEdit = true;
    },

    deleteItem(item) {
      this.editedIndex = this.movies.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm(editedItem) {
      try {
        const response = await this.$apollo.mutate({
          mutation: DELETE_MOVIE_MUTATION,
          variables: {
            delMovieId: this.editedItem.id,
          },
        });
        this.closeDelete();
        this.$notify({
          text: "Filme deletado com sucesso!",
          type: "success",
        });
        await this.$apollo.queries.movies.refetch();
      } catch (error) {
        console.log("Erro ao deletar:", error);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save(newMovie) {
      const newMovieVerify = (this.editedItem.name === newMovie.name && this.editedItem.type === newMovie.type);
      if(newMovieVerify) { 
        this.$notify({
          title: "Erro!",
          text: "Nenhuma alteração no filme",
          type: "error",
        });
        return
      }


      try {
        const movieInput = {
          id: newMovie.id,
          name: newMovie.name,
          type:
            typeof newMovie.type === "object" && newMovie.type !== null
              ? newMovie.type.id
              : newMovie.type,
        };

        const response = await this.$apollo.mutate({
          mutation: UPDATE_MOVIE_MUTATION,
          variables: { movie: movieInput },
        });

        await this.$apollo.queries.movies.refetch();
        this.$notify({
          title: "Sucesso!",
          text: "Filme alterado",
          type: "success",
        });
      } catch (error) {
        console.log("Erro ao editar filme:", error);
        this.$notify({
          title: "Erro!",
          text: "Erro ao salvar/editar filme",
          type: "error",
        });
      }
    },

    setGenderList() {
      const genderStore = useGenderStore();
      this.genders = genderStore.allGenders;
    }
  },
};
</script>

<style scoped></style>
