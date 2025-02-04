import { gql } from "@apollo/client/core";

const DELETE_MOVIE_MUTATION = gql `
mutation delete($delMovieId: ID!) { 
  delMovie(id: $delMovieId)
}
  
`

export default DELETE_MOVIE_MUTATION;