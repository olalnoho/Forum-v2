const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const root = require('./resolvers/')
const db = require('./DB/connection')
const typeDefs = require('./typeDefs/schema')

const schema = buildSchema(typeDefs)
const app = express();

app.use('/graphql',
   graphqlHTTP(req => ({
      schema,
      rootValue: root,
      graphiql: true,
      pretty: true,
      context: {
         req,
         db
      }
   }))
)

app.listen(4000, _ => console.log('Server started on port 4000'))