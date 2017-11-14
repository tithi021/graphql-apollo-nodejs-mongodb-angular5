var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var queryType = require('./queries/user').queryType;
var mutation = require('./mutations/index');

exports.userSchema = new GraphQLSchema({
  query: queryType,
  mutation: new GraphQLObjectType({
    name: 'Mutation',
    fields: mutation
  })
})

