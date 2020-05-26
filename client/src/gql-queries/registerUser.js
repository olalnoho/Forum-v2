import { gql } from 'apollo-boost'

export default gql`
   mutation($email: String! $username: String! $password: String!) {
      registerUser(email: $email, username: $username, password: $password) {
         token,
         user {
            id,
            username,
            email
         }
      }
   }
`