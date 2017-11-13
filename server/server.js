const express = require("express");
const mongoose = require('./config/mongoose');
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const db = mongoose();
const app = express();

app.use('*', cors());

const userSchema = require('./user/index').userSchema;
app.use('/graphql', cors(), graphqlHTTP({
  schema: userSchema,
  rootValue: global,
  graphiql: true
}));

// Up and Running at Port 4000
app.listen(process.env.PORT || 4000, () => {
  console.log('A GraphQL API running at port 4000');
});
