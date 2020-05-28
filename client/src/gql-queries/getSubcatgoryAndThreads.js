import { gql } from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getSubcategoryById(id: $id) {
         id
         title,
         description,
         threads {
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
   }
`