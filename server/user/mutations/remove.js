var GraphQLInt = require('graphql').GraphQLInt;
var UserType = require('../types/user');
var Users = require('../data/user').Users; // List of Users

exports.remove = {
    type: UserType.userType,
    args: {
        id: {
            name: 'id',
            type: GraphQLInt
        }
    },
    resolve(root, params) {
        var index = Users.map(function (x) { return x.id; }).indexOf(params.id);

        Users.splice(index, 1);

        return params.id;
    }
}
