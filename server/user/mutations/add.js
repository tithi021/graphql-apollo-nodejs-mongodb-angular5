
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var Users = require('../data/user').Users; // List of Users

exports.add = {
    type: UserType.userType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        }
    },
    resolve(root, params) {
        const newUser = Object.assign({ id: Users.length + 1 }, { name: params.name })
        Users.push(newUser);
        return newUser
    }
}