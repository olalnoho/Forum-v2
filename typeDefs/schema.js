module.exports = `
   type Query {
      getUserById(id: ID!): User
      getAllCategories: [Category]!
      getSubcategoryById(id: ID!): Subcategory
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
      subcategories: [Subcategory]!
   }

   type Subcategory {
      id: ID!
      title: String
      description: String
      threads: [Thread]!
   }

   """
      creator in Thread is optional 
      because user might be deleted
   """

   type Thread {
      id: ID!
      title: String!
      content: String!
      creator: User
   }

   """
      user in Post is optional 
      because user might be deleted
   """
   type Post {
      id: ID!
      content: String!
      user: User
   }
`