var mongoose = require('mongoose');
// mongoose.Promise = require('bluebird');

const express = require("express");
const graphqlHTTP = require("express-graphql");
var cors = require("cors");
var url = 'mongodb://localhost/testing';

const app = express();

app.use('*', cors());

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
var db = mongoose.connection;
db.on('open', function() {
  console.log('opened');
});

var userSchema = require('./user/index').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});
