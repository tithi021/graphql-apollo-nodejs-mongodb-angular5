var userSchema = require('./user/index').userSchema;
const express = require("express");
const graphqlHTTP = require("express-graphql");
var cors = require("cors");

const app = express();

app.use('*', cors());

app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});
