const express = require("express");
const schema = require("./schema/schema.js");
const color = require("colors");
const connectDB = require("./config/db.js");
const cors = require("cors");

const { graphqlHTTP } = require("express-graphql");
require("dotenv").config();

const port = process.env.PORT || 5000;

const app = express();

// connecting to database
connectDB();

app.use(cors());

app.listen(port, console.log(`server is running on port ${port}`));
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development", //means this will be true
  })
);
