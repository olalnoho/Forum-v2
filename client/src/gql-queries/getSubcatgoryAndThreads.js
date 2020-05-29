import { gql } from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getSubcategoryById(id: $id) {
         id
         title,
         description
      }
   }
`