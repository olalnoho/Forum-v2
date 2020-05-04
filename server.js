const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const DataLoader = require('dataloader')

const db = require('./DB/connection')
const root = require('./resolvers/')
const typeDefs = require('./typeDefs/schema')

const subcatLoader = require('./dataloaders/subcategoryLoader')

const schema = buildSchema(typeDefs)
const app = express();

const gqlOptions = {
   schema,
   rootValue: root,
   graphiql: true,
   pretty: true,
}

app.use('/graphql',
   graphqlHTTP(req => ({
      ...gqlOptions,
      context: {
         req,
         db,
         subcatLoader: new DataLoader(subcatLoader)
      }
   }))
)

app.listen(4000, _ =>
   console.log('Server started on port 4000')
)