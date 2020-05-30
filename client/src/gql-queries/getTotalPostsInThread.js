import {gql} from 'apollo-boost'

export default gql`
   query($id: ID!) {
      getTotalPostsInThread(id: $id)
   }
`