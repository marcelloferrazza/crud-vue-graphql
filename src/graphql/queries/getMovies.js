import { gql } from "@apollo/client/core";

const GET_MOVIES = gql`
  query GetMovies { 
   allMovies {
      id
      name
      type {
        id
        name
        nameTranslate
      }
    }
} 
`

export default GET_MOVIES;

