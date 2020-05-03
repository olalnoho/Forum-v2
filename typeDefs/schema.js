module.exports = `
   type Query {
      getUserById(id: ID!): User
   }

   type User {
      id: ID
      username: String
      email: String
   }
`