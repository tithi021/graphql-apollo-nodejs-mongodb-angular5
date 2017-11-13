var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var UserModel = require('../../models/user');

exports.remove = {
  type: UserType.userType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve(root, params) {
    const removeduser = UserModel.findByIdAndRemove(params.id).exec();
    if (!removeduser) {
      throw new Error('Error')
    }
    return removeduser;
  }
}
