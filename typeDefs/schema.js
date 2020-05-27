module.exports = `
   type Query {
      getUserById(id: ID!): User
      getCurrentUser: User

      getAllCategories: [Category!]!
      getSubcategoryById(id: ID!): Subcategory

      getAllThreadsInSubcategory(id: ID!): [Thread!]
      getWholeThread(id: ID!): Thread!
   }

   type Mutation {
      registerUser(email: String! username: String! password: String!): Auth!
      loginUser(username: String! password: String!): Auth!
      createThread(title: String! content: String! subcategory_id: ID!): ThreadCreate!
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
      posts: [Post!]
   }

   type ThreadCreate {
      id: ID!
      title: String!
      content: String!
      creator: User
      success: Boolean!
   }

   type Post {
      id: ID!
      content: String!
      user: User
   }
`