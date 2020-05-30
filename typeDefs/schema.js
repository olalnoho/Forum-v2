module.exports = `
   type Query {
      landingInfo: [LandingCategoryInfo!]

      getUserById(id: ID!): User
      getCurrentUser: User

      getAllCategories: [Category!]!
      getSubcategoryById(id: ID!): Subcategory

      getAllThreadsInSubcategory(id: ID! limit: Int = 10 offset: Int = 0): [Thread!]
      getThreadById(id: ID!): Thread!
   }

   type Mutation {
      registerUser(email: String! username: String! password: String!): Auth!
      loginUser(username: String! password: String!): Auth!
      createThread(title: String! content: String! subcategory_id: ID!): ThreadCreate!
      createPost(content: String! thread_id: ID!): Boolean!
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
      postCount: Int!
      lastPost: Post
      created_at: String!
      subcategory_id: ID!
   }

   type ThreadCreate {
      id: ID!
      title: String!
      content: String!
      creator: User!
      created_at: String
      success: Boolean!
   }

   type Post {
      id: ID!
      content: String!
      created_at: String!
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