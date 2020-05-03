module.exports = `
   type Query {
      hello: String!
      getNumber(num: Int): Int
   }

   type Mutation {
      getNumber(num: Int): Int
   }
`