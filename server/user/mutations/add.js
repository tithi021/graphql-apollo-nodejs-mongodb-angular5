
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var UserModel = require('../../models/user');

exports.add = {
  type: UserType.userType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    }
  },
  resolve(root, params) {
    const uModel = new UserModel(params);
    const newUser = uModel.save();
    if (!newUser) {
      throw new Error('Error');
    }
    return newUser
  }
}