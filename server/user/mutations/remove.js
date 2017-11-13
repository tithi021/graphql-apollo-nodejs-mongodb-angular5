var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var UserModel = require('../../models/user');

exports.remove = {
  type: UserType.userType,
  args: {
    _id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    console.log(params)
    const removeduser = UserModel.findByIdAndRemove(params._id).exec();
    if (!removeduser) {
      throw new Error('Error')
    }
    return removeduser;
  }
}
