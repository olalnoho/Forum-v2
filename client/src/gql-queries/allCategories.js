import { gql } from 'apollo-boost'

export default gql`
   query {
      getAllCategories {
         id,
         title,
         subcategories {
            id,
            title,
            description
         }
      }
   }
`