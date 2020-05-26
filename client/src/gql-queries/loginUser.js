import { gql } from 'apollo-boost'

export default gql`
   mutation($username: String! $password: String!) {
      loginUser(username: $username, password: $password) {
         token,
         user {
            id,
            username,
            email
         }
      }
   }
`