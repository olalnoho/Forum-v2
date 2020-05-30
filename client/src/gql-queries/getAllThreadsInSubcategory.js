import { gql } from 'apollo-boost'

export default gql`
   query($id: ID! $limit: Int $offset: Int) {
      getAllThreadsInSubcategory(id: $id, limit: $limit, offset: $offset) {
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