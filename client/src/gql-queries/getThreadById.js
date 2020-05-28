import { gql } from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getThreadById(id: $id) {
         id,
         title,
         content,
         created_at,
         creator {
            id,
            username
         }
         posts {
            id,
            content,
            created_at,
            user {
               username
            }
         }
      }
   }
`