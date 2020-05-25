module.exports = `
   type Query {
      getUserById(id: ID!): User
      getAllCategories: [Category]!
      getSubcategoryById(id: ID!): Subcategory
   }

   type Mutation {
      registerUser(email: String! username: String! password: String!): Auth!
      loginUser(username: String! password: String!): Auth!
   }

   type User {
      id: ID!
      username: String!
      email: String!
   }

   type Auth {
      token: String!
      user: User!
   }

   type Category {
      id: ID!
      title: String!
      subcategories: [Subcategory!]
   }

   type Subcategory {
      id: ID!
      title: String!
      description: String!
      threads: [Thread!]
   }

   type Thread {
      id: ID!
      title: String!
      content: String!
      creator: User
   }

   type Post {
      id: ID!
      content: String!
      user: User
   }
`