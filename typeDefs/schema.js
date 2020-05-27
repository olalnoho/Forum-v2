module.exports = `
   type Query {
      landingInfo: [LandingCategoryInfo!]

      getUserById(id: ID!): User
      getCurrentUser: User

      getAllCategories: [Category!]!
      getSubcategoryById(id: ID!): Subcategory

      getAllThreadsInSubcategory(id: ID!): [Thread!]
      getThreadById(id: ID!): Thread!
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
      postCount: Int
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

   type LandingCategoryInfo {
      title: String!
      subcategories: [LandingSubcategoryInfo!]
   }

   type LandingSubcategoryInfo {
      id: ID!
      title: String!
      description: String!
      poster: String
      postcount: Int!
      latestpost: String
   }
`