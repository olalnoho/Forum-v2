import { gql } from 'apollo-boost'

export default gql`
   mutation($content: String! $thread_id: ID!) {
      createPost(content: $content, thread_id: $thread_id) {
         content,
         user {
            username
         }
      }
   }
`