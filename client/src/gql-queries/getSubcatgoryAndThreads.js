import { gql } from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getSubcategoryById(id: $id) {
         title,
         description,
         threads {
            title,
            creator {
            username
            }
         }
      }
   }
`