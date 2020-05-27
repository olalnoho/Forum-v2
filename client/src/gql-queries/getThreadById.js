import { gql } from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getThreadById(id: $id) {
         id,
         title,
         content,
         creator {
            id,
            username
         }
         posts {
            id,
            content,
            user {
               username
            }
         }
      }
   }
`