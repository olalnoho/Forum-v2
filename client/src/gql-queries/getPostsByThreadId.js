import { gql } from 'apollo-boost'

export default gql`
   query($id: ID! $limit: Int $offset: Int){
      getPostsByThreadId(id: $id, limit: $limit, offset: $offset ) {
         id,
         content,
         created_at,
         user {
            id,
            username
         }
      }
   }
`