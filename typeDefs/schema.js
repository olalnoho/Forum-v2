module.exports = `
   type Query {
      getUserById(id: ID!): User
   }

   type Mutation {
      registerUser(email: String! password: String!): Auth!
   }

   type User {
      id: ID!
      username: String
      email: String!
   }

   type Auth {
      token: String!
      user: User!
   }

   type Category {
      id: ID!
      title: String!
   }

   type SubCategory {
      id: ID!
      title: String
      description: String
   }

   type Post {
      id: ID!
      content: String!
      user: User!
   }
`