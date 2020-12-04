const {
  GraphQLSchema
} = require('graphql')

const query = require('./querytype.js')

module.exports = new GraphQLSchema({query})
