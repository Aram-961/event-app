const express = require("express");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require('./schema/schema.js')

const port = process.env.PORT || 5000;

const app = express();

app.listen(port, console.log(`server is running on port ${port}`));
app.use("/graphql", graphqlHTTP({ 
    schema,
    graphiql: process.env.NODE_ENV === 'development' //means this will be true
    
})
);
