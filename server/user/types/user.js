

var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLString = require('graphql').GraphQLString;

// User Type
exports.userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
        return {
            id: {
                type: GraphQLInt
            },
            name: {
                type: GraphQLString
            }
        }
    }
});

// User Input Type
exports.userInputType = new GraphQLInputObjectType({
    name: 'UserInput',
    fields: function () {
        return {
            name: {
                type: GraphQLString
            }
        }
    }
});
