// implementation using graphql
const { MongoClient } = require('mongodb')
const assert = require('assert')
const { graphqlHTTP } = require('express-graphql')
const express = require('express')

const app = express()
const schema = require('./schema/main')
const url = process.env.MONGO_URL
const port = process.env.PROXY_PORT

MongoClient.connect(url, {
  useUnifiedTopology: true
}, (err, client) => {
  assert(err, null)
  console.log('connected to mongodb server..')
  app.use('/graphq', graphqlHTTP({
    schema, context: {client}, graphiql: true
  }))
})

app.listen(port, () => console.log('running express on port', port))
