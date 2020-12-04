const {
  GraphQLObjectType,
  GraphQLString,
} = require('graphql')


module.exports = new GraphQLObjectType({
  name: 'rootquery',
  fields: {
    login: {
      description: 'verify login credentials',
      type: new GraphQLList(LoginType),
      args: {
        username: {type: GraphQLString},
        password: {type: GraphQLString}
      }
    }
  }
})
