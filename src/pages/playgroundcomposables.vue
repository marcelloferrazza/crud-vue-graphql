<template>
  <v-col>
    <div>
      <h1>Generos</h1>
      <v-btn @click="refetchGender"> Atualizar query</v-btn>
      <div v-if="loadingGender">Carregando...</div>
      <div v-if="errorGender">{{ errorGender.message }}</div>
      <ul v-if="types.length">
        <v-divider v-for="type in types" :key="type.id">
          {{ type.nameTranslate }}
        </v-divider>
      </ul>
    </div>

    <div>
      <h1>Filmes</h1>
      <v-btn @click="refetch"> Atualizar query</v-btn>
      <div v-if="loading">Carregando...</div>
      <div v-if="error">{{ error.message }}</div>
      <div v-if="errorDelete">{{ errorDelete.message }}</div>

      <ul v-if="movies.length">
        <v-divider v-for="movie in movies" :key="movie.id">
          {{ movie.name }}
          <v-dialog v-model="dialog[movie.id]" max-width="250">
            <template v-slot:activator="{ props: activatorProps }">
              <v-btn
                v-bind="activatorProps"
                color="error"
                text="deletar"
                variant="flat"
                :loading="loadingDelete"
              ></v-btn>
            </template>

            <template v-slot:default="{}">
              <v-card title="Deletar filme">
                <v-card-text> Quer deletar mesmo? </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="Não" @click="toggleDialog(movie.id)"></v-btn>
                  <v-btn
                    color="error"
                    text="Sim"
                    @click="deleteMovie(movie)"
                  ></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
          <br /><br />
        </v-divider>
      </ul>
    </div>
  </v-col>
  <notifications animation-type="velocity"  />
</template>

<script>
import { computed } from "vue";
import GET_MOVIES from "@/graphql/queries/getMovies";
import GET_GENDERS from "@/graphql/queries/getGenders";
import DELETE_MOVIE_MUTATION from "@/graphql/mutations/delMovie";
import { useQuery } from "@/composables/useQuery";
import { useMutation } from "@/composables/useMutation";
import { useDialog } from "@/composables/useDialog";
import { useNotify } from "@/composables/useNotify";
export default {
  setup() {
    const { message, successNotify } = useNotify();
    const { data, loading, error, refetch } = useQuery(GET_MOVIES);
    const movies = computed(() => data.value?.allMovies || []);
    const {
      data: dataGender,
      loading: loadingGender,
      error: errorGender,
      refetch: refetchGender,
    } = useQuery(GET_GENDERS);
    const types = computed(() => dataGender.value?.genders || []);
    const {
      mutate: mutateDelete,
      loading: loadingDelete,
      error: errorDelete,
    } = useMutation(DELETE_MOVIE_MUTATION, {
      refetchQueries: [{ query: GET_MOVIES }],
    });

    const { dialog, toggleDialog } = useDialog();

    const deleteMovie = async (movie) => {
      try {
        await mutateDelete({ delMovieId: movie.id });
        toggleDialog(movie.id);
        successNotify('Pasapifjsiodfj')
        await refetch();
      } catch (err) {
        console.error("Erro ao deletar:", err);
        toggleDialog(movie.id);
      }
    };

    return {
        message,
        successNotify,
      dialog,
      toggleDialog,
      deleteMovie,
      loadingDelete,
      errorDelete,
      types,
      loadingGender,
      errorGender,
      refetchGender,
      movies,
      loading,
      error,
      refetch,
    };
  },
};
</script>
