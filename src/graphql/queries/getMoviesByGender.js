import { gql } from "@apollo/client/core";      

const GET_MOVIES_BY_GENDER = gql`
 query getMovieByGender($genderId: ID!) { 
  moviesByGender(genderId: $genderId) {
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

export default GET_MOVIES_BY_GENDER;