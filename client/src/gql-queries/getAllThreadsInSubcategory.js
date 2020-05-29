import { gql } from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getAllThreadsInSubcategory(id: $id) {
         created_at,
         postCount,
         id,
         title,
         creator {
            id
            username
         },
         lastPost {
            id,
            created_at
            user {
               id
               username
            }
         }
      }
   }
`