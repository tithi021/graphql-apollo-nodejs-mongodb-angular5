var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLInt = require('graphql').GraphQLInt;
var UserType = require('../types/user');
var Users = require('../data/user').Users; // List of Users

exports.update = {
    type: UserType.userType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        },
        data: {
            name: 'data',
            type: new GraphQLNonNull(UserType.userInputType)
        }
    },
    resolve(root, params) {
        var index = Users.map(function (x) { return x.id; }).indexOf(params.id);
        Users[index].name = params.data.name;
        return params.id;
    }
}

