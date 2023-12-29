// Import necessary modules
const { projects, clients } = require("../sampledata.js"); // Import client and project data
const graphql = require("graphql"); // Import GraphQL library
const Project = require("../models/Project.js");
const Client = require("../models/Client.js");

// Extract commonly used GraphQL types for clarity
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
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
        return clients.findById(parent.clientId);
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
        return Client.find();
      },
    },
    // Client retrieval field
    client: {
      type: ClientType, // Returns a Client object
      args: { id: { type: GraphQLID } }, // Argument to specify the client to fetch
      resolve(parentValue, args) {
        return Client.findById(arg.id);
      },
    },
    Projects: {
      type: new GraphQLList(ProjectType),
      resolve(parentValue, args) {
        return Project.find();
      },
    },

    project: {
      type: ProjectType, // Returns a Client object
      args: { id: { type: GraphQLID } }, // Argument to specify the client to fetch
      resolve(parentValue, args) {
        return Project.findById(args.id);
      },
    },
  },
});

//**MUTATIONS */
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addClient: {
      type: ClientType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        phone: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const client = new Client({
          name: args.name,
          email: args.email,
          phone: args.phone,
        });

        return client.save();
      },
    },
  },
});

// **GraphQL Schema Construction**
// Create the GraphQL schema, making the RootQueryType available for queries
module.exports = new GraphQLSchema({
  query: RootQuery, // Specify RootQueryType as the query root
  mutation,
});
