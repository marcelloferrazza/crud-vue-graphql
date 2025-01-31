import { defineStore } from 'pinia'

import apolloClient from '@/plugins/apollo'

import GET_MOVIES from '@/graphql/queries/getMovies'
import GET_MOVIES_BY_GENDER from '@/graphql/queries/getMoviesByGender'
import CREATE_MOVIE from '@/graphql/mutations/createMovie'
import UPDATE_MOVIE from '@/graphql/mutations/updateMovie'
import DELETE_MOVIE from '@/graphql/mutations/deleteMovie'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [],
    loading: false,
    error: null,
  }), 

  actions: {

    async fetchMovies(genderId = 1) {
      this.loading = true
      this.error = null

      try {
        // Exemplo: Decide se usa GET_MOVIES ou GET_MOVIES_BY_GENDER
        const query = genderId === 1 ? GET_MOVIES : GET_MOVIES_BY_GENDER
        const variables = genderId === 1 ? {} : { genderId }

        const { data } = await apolloClient.query({
          query,
          variables,
          fetchPolicy: 'no-cache', // ou 'network-only', depende da sua estratégia
        })
        
        // Ajuste de acordo com o nome do campo que vem na sua API
        if (genderId === 1) {
          this.movies = data?.allMovies ?? []
        } else {
          this.movies = data?.moviesByGender ?? []
        }
      } catch (err) {
        this.error = err
        console.error('Erro ao buscar filmes:', err)
      } finally {
        this.loading = false
      }
    },

    /** Cria um novo filme via mutation GraphQL **/
    async createMovie(movieInput) {
      this.loading = true
      this.error = null

      try {
        const { data } = await apolloClient.mutate({
          mutation: CREATE_MOVIE,
          variables: {
            input: movieInput
          },
        })
        // Ajuste de acordo com o retorno do seu resolver (por ex.: data.createMovie)
        const newMovie = data?.createMovie
        if (newMovie) {
          // Atualiza o estado local. 
          // (Se quiser pode refetch a lista inteira ou usar cache do Apollo)
          this.movies.push(newMovie)
        }
        return newMovie
      } catch (err) {
        this.error = err
        console.error('Erro ao criar filme:', err)
      } finally {
        this.loading = false
      }
    },

    /** Edita um filme **/
    async updateMovie(movieId, updates) {
      this.loading = true
      this.error = null

      try {
        const { data } = await apolloClient.mutate({
          mutation: UPDATE_MOVIE,
          variables: {
            id: movieId,
            input: updates,
          },
        })
        // Ajuste de acordo com o nome do campo de retorno
        const updatedMovie = data?.updateMovie
        if (updatedMovie) {
          // Atualiza no array local
          const index = this.movies.findIndex(m => m.id === movieId)
          if (index !== -1) {
            this.movies[index] = updatedMovie
          }
        }
        return updatedMovie
      } catch (err) {
        this.error = err
        console.error('Erro ao atualizar filme:', err)
      } finally {
        this.loading = false
      }
    },

    /** Deleta um filme **/
    async deleteMovie(movieId) {
      this.loading = true
      this.error = null

      try {
        await apolloClient.mutate({
          mutation: DELETE_MOVIE,
          variables: { id: movieId },
        })
        // Se deu certo, removemos localmente
        this.movies = this.movies.filter(m => m.id !== movieId)
      } catch (err) {
        this.error = err
        console.error('Erro ao deletar filme:', err)
      } finally {
        this.loading = false
      }
    }
  }
})
