var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLString = require('graphql').GraphQLString;
var UserType = require('../types/user');
var UserModel = require('../../models/user');

exports.update = {
  type: UserType.userType,
  args: {
    _id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLID)
    },
  name: {
      type: new GraphQLNonNull(GraphQLString),
    }
},
  resolve(root, params) {
    console.log(params)
  return UserModel.findByIdAndUpdate(
  params._id,
	{ $set: { name: params.name } },
			{ new: true }
		)
    .catch(err => new Error(err));
  }
}

