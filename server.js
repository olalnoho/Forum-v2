const express = require('express');
const cors = require('cors')
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const DataLoader = require('dataloader')

const db = require('./DB/connection')
const root = require('./resolvers/')
const typeDefs = require('./typeDefs/schema')

const loader = require('./dataloaders/loader')

const schema = buildSchema(typeDefs)
const app = express();
app.use(cors())
const gqlOptions = {
   schema,
   rootValue: root,
   graphiql: true,
   pretty: true,
}

// @todo
// clean up package.json
// like faker and sqlite

app.use('/graphql',
   graphqlHTTP(req => ({
      ...gqlOptions,
      context: {
         req,
         db,
         // category -> subcategory relationship
         subcatLoader: new DataLoader(loader('subcategory', 'category_id')),
         // subcategory -> thread relationship
         threadLoader: new DataLoader(loader('thread', 'subcategory_id')),
         // thread -> user relationship
         userLoader: new DataLoader(loader('user', 'id')),
      }
   }))
)

app.listen(4000, _ =>
   console.log('Server started on port 4000')
)