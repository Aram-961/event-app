// Import necessary modules
const { projects, clients } = require("../sampledata.js"); // Import client and project data
const graphql = require("graphql"); // Import GraphQL library

// Extract commonly used GraphQL types for clarity
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

// **Client Schema Definition**
// Define a GraphQL type representing a client
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID }, // Unique identifier for the client
    name: { type: GraphQLString }, // Client's name
    email: { type: GraphQLString }, // Client's email address
    phone: { type: GraphQLString }, // Client's phone number
  }),
});

const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    // relationship
    client: {
      type: ClientType,
      resolve(parentValue, args) {
        return clients.find((client) => client.id === parentValue.id);
      },
    },
  }),
});

// **Root Query Definition**
// Define the root query type, the entry point for GraphQL queries
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // we're retrieving all the clients info
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parentValue, args) {
        // Resolve function to fetch client data
        return clients;
      },
    },
    // Client retrieval field
    client: {
      type: ClientType, // Returns a Client object
      args: { id: { type: GraphQLID } }, // Argument to specify the client to fetch
      resolve(parentValue, args) {
        return clients.find((client) => client.id === args.id);
      },
    },
    Projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return projects;
      },
    },

    project: {
      type: ProjectType, // Returns a Client object
      args: { id: { type: GraphQLID } }, // Argument to specify the client to fetch
      resolve(parentValue, args) {
        return projects.find((project) => project.id === args.id);
      },
    },
  },
});

// **GraphQL Schema Construction**
// Create the GraphQL schema, making the RootQueryType available for queries
module.exports = new GraphQLSchema({
  query: RootQuery, // Specify RootQueryType as the query root
});
