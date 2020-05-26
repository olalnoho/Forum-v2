import { gql } from 'apollo-boost'

export default gql`
   query {
      getCurrentUser {
         id,
         username,
         email
      }
   }
`