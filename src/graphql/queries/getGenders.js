import { gql } from "@apollo/client/core";      

const GET_GENDERS = gql`
  query GetGenders {
    genders {
      id
      name
      nameTranslate
    }
  }
`;



export default GET_GENDERS;