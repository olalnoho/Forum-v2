import { gql } from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getAllThreadsInSubcategory(id: $id) {
         id,
         title,
         creator {
            username
         }
      }
   }
`