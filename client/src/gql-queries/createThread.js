import { gql } from 'apollo-boost'

export default gql`
   mutation($title: String! $content: String! $subcategory_id: ID!) {
      createThread(title: $title, content: $content, subcategory_id: $subcategory_id) {
         title,
         content
      }
   }
`