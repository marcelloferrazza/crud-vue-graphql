import { gql } from "@apollo/client/core";

const UPDATE_MOVIE_MUTATION = gql `
mutation updateMovie($movie: UpdateMovieInput!) { 
  updateMovie(movie: $movie) {
    id
    name
    type {
      id
      name
      nameTranslate
    }
  }
}
`;

export default UPDATE_MOVIE_MUTATION;