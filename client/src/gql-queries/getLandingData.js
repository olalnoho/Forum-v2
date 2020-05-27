import { gql } from 'apollo-boost'

export default gql`
   query {
      landingInfo {
         title,
         subcategories {
            id,
            title,
            postcount,
            poster,
            latestpost,
            description
         }
      }
   }
`