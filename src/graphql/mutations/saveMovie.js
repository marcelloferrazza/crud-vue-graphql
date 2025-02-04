import { gql } from "@apollo/client/core";      

const SAVE_MOVIE_MUTATION = gql`
 mutation saveMovie($movie: MovieInput!) { 
  saveMovie(movie: $movie) {
    name
    id
    type {
      id
      name
      nameTranslate
    }
  }
}
`;

export default SAVE_MOVIE_MUTATION;
